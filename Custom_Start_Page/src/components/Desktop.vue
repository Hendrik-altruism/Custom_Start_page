<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import YouTubeIcon from './icons/IconYouTube.vue'
import TelekomIcon from './icons/IconTelekom.vue'
import ConetIcon from './icons/IconConet.vue'
import TwitchIcon from './icons/IconTwitch.vue'
import WhatsAppIcon from './icons/IconWhatsApp.vue'
import GitHubIcon from './icons/IconGitHub.vue'
import WohnungenIcon from './icons/IconWohnungen.vue'
import JobIcon from './icons/IconJob.vue'
import GPTIcon from './icons/IconGPT.vue'
import CalendarIcon from './icons/IconCalendar.vue'
import InstagramIcon from './icons/IconInstagram.vue'
import HbrsIcon from './icons/IconHbrs.vue'
import MailIcon from './icons/IconMail.vue'
import NetflixIcon from './icons/IconNetflix.vue'
import AmazonIcon from './icons/IconAmazon.vue'
import PrimeVideoIcon from './icons/IconPrimeVideo.vue'
import SparkasseIcon from './icons/IconSparkasse.vue'
import TradeRepublicIcon from './icons/IconTradeRepublic.vue'
import INGIcon from './icons/IconING.vue'
import BeerwatchIcon from './icons/IconBeerwatch.vue'
import GoogleIcon from './icons/IconGoogle.vue'
import ScholarIcon from './icons/IconScholar.vue'
import SpringerIcon from './icons/IconSpringer.vue'
import TravelIcon from './icons/IconTravel.vue'
import CalculatorIcon from './icons/IconCalculator.vue'
import AsosIcon from './icons/IconAsos.vue'
import LinkedIcon from './icons/IconLinked.vue'
import DisneyIcon from './icons/IconDisney.vue'

import urls from '../assets/links.json';
import Modal from './Modal.vue'
import SearchItem from './SearchItem.vue'

// Grid order. `key` refers to an entry in links.json; tiles without a key are decorative,
// `null` is an empty cell. Tiles with `search: true` are replaced by the searchbar while it is open.
const tiles = [
  { key: 'youtube', icon: YouTubeIcon, label: 'YouTube' },
  { key: 'whatsapp', icon: WhatsAppIcon, label: 'WhatsApp' },
  { key: 'instagram', icon: InstagramIcon, label: 'Instagram' },
  { key: 'linked', icon: LinkedIcon, label: 'LinkedIn' },
  { key: 'calendar', icon: CalendarIcon, label: 'Kalender' },

  { key: 'primevideo', icon: PrimeVideoIcon, label: 'Prime Video' },
  { key: 'springer', icon: SpringerIcon, label: 'Springer', search: true },
  { key: 'google', icon: GoogleIcon, label: 'Google', search: true },
  { key: 'scholar', icon: ScholarIcon, label: 'Google Scholar', search: true },
  { key: 'job', icon: JobIcon, label: 'Jobs' },

  { key: 'netflix', icon: NetflixIcon, label: 'Netflix' },
  { key: 'github', icon: GitHubIcon, label: 'GitHub' },
  { icon: ConetIcon, label: 'Conet' },
  { key: 'chatgpt', icon: GPTIcon, label: 'ChatGPT' },
  { key: 'wohnungen', icon: WohnungenIcon, label: 'Wohnungen' },

  { key: 'disney', icon: DisneyIcon, label: 'Disney+' },
  { key: 'freunde', icon: BeerwatchIcon, label: 'Privat' },
  { key: 'hbrs', icon: HbrsIcon, label: 'H-BRS' },
  { key: 'amazon', icon: AmazonIcon, label: 'Amazon' },
  { key: 'mail', icon: MailIcon, label: 'Mail' },

  { key: 'twitch', icon: TwitchIcon, label: 'Twitch' },
  { key: 'sparkasse', icon: SparkasseIcon, label: 'Sparkasse' },
  { key: 'ing', icon: INGIcon, label: 'ING' },
  { key: 'trade', icon: TradeRepublicIcon, label: 'Trade Republic' },
  { key: 'travel', icon: TravelIcon, label: 'Reisen' },

  { icon: TelekomIcon, label: 'Telekom' },
  { key: 'asos', icon: AsosIcon, label: 'ASOS' },
  null,
  null,
  { key: 'calculator', icon: CalculatorIcon, label: 'Rechner' },
];

const showModal = ref(false);
const modalContent = ref(null);

const searchbarType = ref('');
const showSearch = computed(() => searchbarType.value !== '');
const firstSearchIndex = tiles.findIndex((tile) => tile?.search);

let exec = (key) => {
  const entry = urls[key];
  if (!entry) return;
  if (entry.display === 'modal') {
    modalContent.value = entry;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  } else if (entry.display === 'search') {
    searchbarType.value = key;
  } else {
    window.location.href = entry.links;
  }
};

let handleEscape = () => {
  showModal.value = false;
  searchbarType.value = '';
  document.body.style.overflow = '';
};

let onKeydown = (event) => {
  // The searchbar input handles Escape itself (clear first, then close) and prevents the default.
  // This catches Escape when focus has left the input, e.g. after tabbing out of it.
  if (event.key === 'Escape' && !event.defaultPrevented && (showModal.value || showSearch.value)) handleEscape();
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="desktop-container">
    <template v-for="(tile, index) in tiles" :key="index">
      <div v-if="showSearch && index === firstSearchIndex" class="iconelement searchbar">
        <SearchItem
          :key="searchbarType"
          :searchbarType="searchbarType"
          :searchbarUrl="urls[searchbarType].links"
          @close="handleEscape"
        />
      </div>

      <div v-if="!tile" class="iconelement"></div>
      <div v-else-if="!(showSearch && tile.search)" class="iconelement">
        <button
          v-if="tile.key"
          type="button"
          class="tile"
          :title="tile.label"
          :aria-label="tile.label"
          @click="exec(tile.key)"
        >
          <component :is="tile.icon" />
        </button>
        <div v-else class="tile tile-static" :title="tile.label">
          <component :is="tile.icon" />
        </div>
      </div>
    </template>

    <Transition name="fade">
      <div v-if="showModal || showSearch" id="desktop-bg" @click="handleEscape"></div>
    </Transition>

    <Modal v-if="showModal" :content="modalContent" @close="handleEscape" />
  </div>
</template>

<style scoped>
.desktop-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem 3rem;
}

.iconelement {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13em;
  color: var(--color-text);
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  border: none;
  border-radius: 28px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tile-static {
  cursor: default;
}

.tile :deep(svg) {
  filter: invert(71%) sepia(3%) saturate(10%) hue-rotate(7deg) brightness(88%) contrast(95%);
  transition: filter 0.3s ease, scale 0.3s ease;
}

.tile:focus-visible {
  outline: 2px solid var(--color-accent-text);
  outline-offset: 2px;
}

@media (hover: hover) {
  button.tile:hover {
    background-color: var(--color-hover-text);
  }

  button.tile:hover :deep(svg) {
    filter: none;
    scale: 1.1;
  }
}

button.tile:focus-visible :deep(svg) {
  filter: none;
}

button.tile:active :deep(svg) {
  scale: 0.97;
}

.searchbar {
  grid-column: span 3;
  position: relative;
  z-index: 60;
}

#desktop-bg {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .desktop-container {
    grid-template-columns: repeat(3, 1fr);
    padding: 1rem;
  }

  .iconelement {
    height: 9em;
  }

  .tile :deep(svg) {
    max-width: 70px;
    max-height: 70px;
  }
}
</style>
