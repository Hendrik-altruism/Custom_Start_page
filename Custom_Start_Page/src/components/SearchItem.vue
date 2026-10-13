<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import SearchIcon from './icons/IconSearch.vue';
import HistoryIcon from './icons/IconHistory.vue';
import CloseIcon from './icons/IconClose.vue';
import { saveSearch, loadSearches, deleteByQuery, normalizeQuery } from './../assets/indexedDB.js';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
  searchbarUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const maxHistoryItems = 8;

const textInput = ref(null);
const query = ref('');
const history = ref([]);
const keyPos = ref(-1);
const focused = ref(false);

const placeholders = {
  google: 'Google durchsuchen…',
  scholar: 'Google Scholar durchsuchen…',
  springer: 'Springer Link durchsuchen…',
};
const placeholder = computed(() => placeholders[props.searchbarType] ?? 'Suche…');

// Newest first, filtered by what has been typed so far.
const searchHistoryItems = computed(() => {
  const needle = normalizeQuery(query.value).toLowerCase();
  const items = [];
  for (let i = history.value.length - 1; i >= 0 && items.length < maxHistoryItems; i--) {
    const item = history.value[i].query;
    if (item.toLowerCase().includes(needle)) items.push(item);
  }
  return items;
});

// Inline completion: the most recent entry that starts with exactly what was typed
// (case-insensitive). Only the remainder is shown, so the ghost text lines up with the input.
const suggestionRest = computed(() => {
  const typed = query.value;
  if (!typed.trim()) return '';
  const lower = typed.toLowerCase();
  for (let i = history.value.length - 1; i >= 0; i--) {
    const item = history.value[i].query;
    if (item.length > typed.length && item.toLowerCase().startsWith(lower)) {
      return item.slice(typed.length);
    }
  }
  return '';
});

const showDropdown = computed(() => focused.value && searchHistoryItems.value.length > 0);

let refreshHistory = async () => {
  try {
    history.value = await loadSearches(props.searchbarType);
  } catch (error) {
    console.error('Suchverlauf konnte nicht geladen werden:', error);
  }
};

let onInput = () => {
  keyPos.value = -1;
};

let onBlur = () => {
  focused.value = false;
  // Otherwise a stale highlight would be searched instead of the typed text after refocusing.
  keyPos.value = -1;
};

let acceptSuggestion = (event) => {
  const selected = keyPos.value >= 0 ? searchHistoryItems.value[keyPos.value] : null;
  if (!selected && !suggestionRest.value) return;
  const input = textInput.value;
  // ArrowRight only completes when the caret is at the end, otherwise it just moves the caret.
  if (event.key === 'ArrowRight' && (input.selectionStart !== query.value.length || input.selectionEnd !== query.value.length)) return;
  event.preventDefault();
  query.value = selected ?? query.value + suggestionRest.value;
  keyPos.value = -1;
};

// Cycles through the entries and back to the input itself (-1), like the Google searchbar.
let changeSelect = (step) => {
  const count = searchHistoryItems.value.length;
  if (count === 0) return;
  keyPos.value = ((keyPos.value + 1 + step + count + 1) % (count + 1)) - 1;
};

let submitting = false;

let search = async (value = query.value) => {
  const normalized = normalizeQuery(value);
  if (!normalized || submitting) return;
  submitting = true;
  try {
    await saveSearch(normalized, props.searchbarType);
  } catch (error) {
    console.error('Suchanfrage konnte nicht gespeichert werden:', error);
  }
  window.location.href = props.searchbarUrl + encodeURIComponent(normalized);
};

// Reset when the page is restored from the back/forward cache after a search.
let onPageShow = (event) => {
  if (!event.persisted) return;
  submitting = false;
  refreshHistory();
};

let onEnter = () => {
  if (keyPos.value >= 0) {
    search(searchHistoryItems.value[keyPos.value]);
  } else {
    search();
  }
};

let onEscape = () => {
  if (keyPos.value >= 0) {
    keyPos.value = -1;
  } else if (query.value) {
    query.value = '';
  } else {
    emit('close');
  }
};

let deleteHistory = async (item) => {
  try {
    await deleteByQuery(item, props.searchbarType);
  } catch (error) {
    console.error('Eintrag konnte nicht gelöscht werden:', error);
  }
  await refreshHistory();
  if (keyPos.value >= searchHistoryItems.value.length) {
    keyPos.value = searchHistoryItems.value.length - 1;
  }
  textInput.value?.focus();
};

onMounted(async () => {
  window.addEventListener('pageshow', onPageShow);
  textInput.value.focus();
  await refreshHistory();
});

onBeforeUnmount(() => window.removeEventListener('pageshow', onPageShow));
</script>

<template>
  <div class="search-container" :class="{ open: showDropdown }">
    <form class="input-container" role="search" @submit.prevent="onEnter">
      <SearchIcon class="search-icon" />
      <div class="input-wrapper">
        <div class="ghost" aria-hidden="true"><span class="ghost-typed">{{ query }}</span>{{ suggestionRest }}</div>
        <input
          ref="textInput"
          v-model="query"
          type="text"
          :placeholder="placeholder"
          class="search-string"
          autocomplete="off"
          spellcheck="false"
          @focus="focused = true"
          @blur="onBlur"
          @input="onInput"
          @keydown.tab="acceptSuggestion"
          @keydown.right="acceptSuggestion"
          @keydown.up.prevent="changeSelect(-1)"
          @keydown.down.prevent="changeSelect(1)"
          @keydown.esc.prevent="onEscape"
        >
      </div>
      <kbd v-if="suggestionRest || keyPos >= 0" class="hint">Tab</kbd>
    </form>

    <ul v-show="showDropdown" class="searches" @mousedown.prevent @mouseleave="keyPos = -1">
      <li
        v-for="(item, index) in searchHistoryItems"
        :key="item"
        class="search-element"
        :class="{ 'focused-search': keyPos === index }"
        @mouseenter="keyPos = index"
        @click="search(item)"
      >
        <HistoryIcon class="history-icon" />
        <span class="search-text">{{ item }}</span>
        <button type="button" class="close-icon" title="Aus Verlauf entfernen" @click.stop="deleteHistory(item)">
          <CloseIcon />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: min(100%, 40rem);
  animation: grow 0.35s ease-out;
}

.input-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  height: var(--searchbar-height);
  padding: 0 22px;
  border-radius: calc(var(--searchbar-height) / 2);
  background-color: var(--color-accent2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.open .input-container {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: none;
}

.search-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: var(--color-heading);
  opacity: 0.8;
}

.input-wrapper {
  position: relative;
  flex: 1;
  min-width: 0;
}

.search-string,
.ghost {
  font: inherit;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 1.5;
  padding: 0;
}

.search-string {
  position: relative;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-heading);
}

.ghost {
  position: absolute;
  inset: 0;
  white-space: pre;
  overflow: hidden;
  pointer-events: none;
  color: var(--color-text);
  opacity: 0.6;
}

.ghost-typed {
  visibility: hidden;
}

.search-string::placeholder {
  color: var(--color-text);
}

.hint {
  flex-shrink: 0;
  font-family: inherit;
  font-size: 0.7rem;
  padding: 1px 6px;
  border: 1px solid var(--color-text);
  border-radius: 5px;
  color: var(--color-text);
  opacity: 0.7;
}

.searches {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  margin: 0;
  padding: 6px 0 12px;
  list-style: none;
  background-color: var(--color-accent2);
  border-top: 1px solid var(--color-border-hover);
  border-radius: 0 0 calc(var(--searchbar-height) / 2) calc(var(--searchbar-height) / 2);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
}

.search-element {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px 8px 22px;
  border-left: 3px solid transparent;
  cursor: pointer;
  color: var(--color-heading);
}

.focused-search {
  background-color: var(--color-hover-text);
  border-left-color: var(--color-heading);
}

.history-icon {
  flex-shrink: 0;
  opacity: 0.7;
}

.search-text {
  flex: 1;
  min-width: 0;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-icon {
  display: flex;
  padding: 3px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  visibility: hidden;
}

.focused-search .close-icon {
  visibility: visible;
}

.close-icon:hover {
  background-color: var(--color-accent-text);
}

@keyframes grow {
  from { width: min(100%, 14rem); opacity: 0.4; }
  to { width: min(100%, 40rem); opacity: 1; }
}
</style>
