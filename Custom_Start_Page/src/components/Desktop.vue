<script setup>
import { ref } from 'vue';
import { nextTick } from 'vue';

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


const showModal = ref(false);
const modalContent = ref(null);

const showSearch = ref(false);
const searchbarType = ref("");
const searchbarUrl = ref("");
const searchbarObject = ref(null);


let exec = async (key) => {
  if(urls[key].display == "modal"){
    modalContent.value = urls[key];
    showModal.value = true;
    document.body.style.overflow = "hidden";
  }else if (urls[key].display == "search"){
    showSearch.value = true;
    searchbarType.value = key;
    searchbarUrl.value = urls[key].links;
    nextTick(() => {
      const inputElement = searchbarObject.value.querySelector(".search-string");
      if (inputElement) {
        inputElement.focus();
      }
    });
  }else{
    window.open(urls[key].links, "_self");
  }
}

let handleEscape = () => {
  showModal.value = false;
  showSearch.value = false;
  document.body.style.overflow = "visible";
}
</script>

<template>
  <div class="desktop-container">
    <div class="iconelement">
      <YouTubeIcon @click="exec('youtube')"/>
    </div>

    <div class="iconelement">
      <WhatsAppIcon @click="exec('whatsapp')"/>
    </div>

    <div class="iconelement">
      <InstagramIcon @click="exec('instagram')"/>
    </div>

    <div class="iconelement">
      <LinkedIcon  @click="exec('linked')"/>
    </div>

    <div class="iconelement">
      <CalendarIcon @click="exec('calendar')"/>
    </div>

    <div class="iconelement">
      <PrimeVideoIcon @click="exec('primevideo')"/>
    </div>

    <div v-show="!showSearch" class="iconelement searchsvg">
      <SpringerIcon @click="exec('springer')"/>
    </div>

    <div v-show="!showSearch" class="iconelement searchsvg">
      <GoogleIcon @click="exec('google')"/>
    </div>

    <div v-show="!showSearch" class="iconelement searchsvg">
      <ScholarIcon @click="exec('scholar')"/>
    </div>

    <div v-show="showSearch" ref="searchbarObject" class="iconelement searchbar">
      <SearchItem :searchbarType="searchbarType" :searchbarUrl="searchbarUrl"/>
    </div> 

    <div class="iconelement">
      <JobIcon @click="exec('job')"/>
    </div>

    <div class="iconelement">
      <NetflixIcon @click="exec('netflix')"/>
    </div>

    <div class="iconelement">
      <GitHubIcon @click="exec('github')"/>
    </div>

    <div class="iconelement">
      <ConetIcon />
    </div>

    <div class="iconelement">
      <GPTIcon @click="exec('chatgpt')"/>
    </div>

    <div class="iconelement">
      <WohnungenIcon @click="exec('wohnungen')"/>
    </div>

    <div class="iconelement">
      <DisneyIcon @click="exec('disney')"/>
    </div>

    <div class="iconelement">
      <BeerwatchIcon @click="exec('freunde')"/>
    </div>

    <div class="iconelement">
      <HbrsIcon @click="exec('hbrs')"/>
    </div>

    <div class="iconelement">
      <AmazonIcon @click="exec('amazon')"/>
    </div>

    <div class="iconelement">
      <MailIcon @click="exec('mail')"/>
    </div>

    <div class="iconelement">
      <TwitchIcon @click="exec('twitch')"/>
    </div>

    <div class="iconelement">
      <SparkasseIcon @click="exec('sparkasse')"/>
    </div>

    <div class="iconelement">
      <INGIcon @click="exec('ing')"/>
    </div>

    <div class="iconelement">
      <TradeRepublicIcon @click="exec('trade')"/>
    </div>

    <div class="iconelement">
      <TravelIcon  @click="exec('travel')"/>
    </div>

    <div class="iconelement">
      <TelekomIcon />
    </div>

    <div class="iconelement">
      <AsosIcon @click="exec('asos')"/>
    </div>

    <div class="iconelement">
      
    </div>

    <div class="iconelement">
      
    </div>

    <div class="iconelement">
      <CalculatorIcon @click="exec('calculator')"/>
    </div>

    <Modal v-if="showModal" :content="modalContent"/>

    <div v-if="showModal||showSearch" id="desktop-bg" @click="handleEscape()"></div>
  </div>
</template>

<style scoped>
.desktop-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  overflow: hidden;
}

.iconelement{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13em;
  color: var(--color-text);
}

.iconelement svg{
  filter: invert(71%) sepia(3%) saturate(10%) hue-rotate(7deg) brightness(88%) contrast(95%);
  scale: 1;
  transition-property: scale;
  transition-duration: .5s;
}

.searchbar{
  grid-column: span 3;
}

@media (hover: hover) {
  .iconelement svg:hover{
    /* Change */
    /* filter: invert(47%) sepia(65%) saturate(302%) hue-rotate(127deg) brightness(97%) contrast(95%); */
    filter: none;
    cursor: pointer;
    scale: 1.15;
  }
}

.iconelement svg:active{
  cursor: pointer;
  scale: 1;
}

#desktop-bg{
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 100%;
  height: calc(100vmax - var(--header-height));
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
