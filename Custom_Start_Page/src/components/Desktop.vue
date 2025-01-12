<script setup>
import { ref } from 'vue';

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

import urls from '../assets/links.json';
import Modal from './Modal.vue'
import SearchItem from './SearchItem.vue'


const showModal = ref(false);
const showSearch = ref(false);
const modalContent = ref('linksitem');

let exec = (key) => {
  if(urls[key].display_modal){
    openModal(urls[key])
  }else{
    window.open(urls[key].links, "_self");
  }
}

let openModal = (item) => {
  modalContent.value = item;
  showModal.value = true;
}

let handleEscape = () => {
  document.querySelectorAll(".popup").forEach(element => {
    element.style.display = "none";
  })
  document.querySelectorAll(".searchsvg").forEach(element => {
    element.style.display = "flex";
  });
  showModal.value = false;
  showSearch.value = false;
}

let changeSearch = (engine) => {
  switch (engine) {
        case "springer":
            const searchbarSpringer = document.getElementById("searchbar-springer");
            searchbarSpringer.style.display = "flex";
            searchbarSpringer.querySelector(".search-string").focus();
            showSearch.value = true;
            break;
        
        case "google":
            const searchbarGoogle = document.getElementById("searchbar-google");
            searchbarGoogle.style.display = "flex";
            searchbarGoogle.querySelector(".search-string").focus();
            showSearch.value = true;
            break;
        
        case "scholar":
            const searchbarScholar = document.getElementById("searchbar-scholar");
            searchbarScholar.style.display = "flex";
            searchbarScholar.querySelector(".search-string").focus();
            showSearch.value = true;
            break;

        default:
            break;
    }
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
      <GPTIcon @click="exec('chatgpt')"/>
    </div>

    <div class="iconelement">
      <CalendarIcon @click="exec('calendar')"/>
    </div>

    <div class="iconelement">
      <TwitchIcon @click="exec('twitch')"/>
    </div>

    <div class="iconelement searchsvg">
      <SpringerIcon @click="changeSearch('springer')"/>
    </div>

    <div id="searchbar-springer" class="iconelement searchbar popup">
      <SearchItem searchbarType="springer"/>
    </div> 

    <div class="iconelement searchsvg">
      <GoogleIcon @click="changeSearch('google')"/>
    </div>

    <div id="searchbar-google" class="iconelement searchbar popup">
      <SearchItem searchbarType="google"/>
    </div> 

    <div class="iconelement searchsvg">
      <ScholarIcon @click="changeSearch('scholar')"/>
    </div>

    <div id="searchbar-scholar" class="iconelement searchbar popup">
      <SearchItem searchbarType="scholar"/>
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
      <TelekomIcon />
    </div>

    <div class="iconelement">
      <WohnungenIcon />
    </div>

    <div class="iconelement">
      <PrimeVideoIcon  @click="exec('primevideo')"/>
    </div>

    <div class="iconelement">
      <BeerwatchIcon />
    </div>

    <div class="iconelement">
      <HbrsIcon />
    </div>

    <div class="iconelement">
      <AmazonIcon @click="exec('amazon')"/>
    </div>

    <div class="iconelement">
      <MailIcon @click="exec('mail')"/>
    </div>

    <div class="iconelement">
      <TradeRepublicIcon @click="exec('trade')"/>
    </div>

    <div class="iconelement">
      <SparkasseIcon @click="exec('sparkasse')"/>
    </div>

    <div class="iconelement">
      <INGIcon @click="exec('ing')"/>
    </div>

    <div class="iconelement">
      <AsosIcon @click="exec('asos')"/>
    </div>

    <div class="iconelement">
      <TravelIcon  @click="exec('travel')"/>
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
  display: none;
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
  height: 100%;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>

<script>


</script>