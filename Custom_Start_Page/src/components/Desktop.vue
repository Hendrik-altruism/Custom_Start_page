<script setup>
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

import SearchItem from './SearchItem.vue'
</script>

<template>
  <div class="desktop-container">
    <div class="iconelement">
      <YouTubeIcon />
    </div>

    <div class="iconelement">
      <WhatsAppIcon />
    </div>

    <div class="iconelement">
      <InstagramIcon />
    </div>

    <div class="iconelement">
      <GPTIcon />
    </div>

    <div class="iconelement">
      <CalendarIcon />
    </div>

    <div class="iconelement">
      <TwitchIcon />
    </div>

    <div class="iconelement searchsvg">
      <SpringerIcon @click="changeSearch('springer')"/>
    </div>

    <div id="searchbarSpringer" class="iconelement searchbar">
      <SearchItem searchbarType="springer"/>
    </div> 

    <div class="iconelement searchsvg">
      <GoogleIcon @click="changeSearch('google')"/>
    </div>

    <div id="searchbarGoogle" class="iconelement searchbar">
      <SearchItem searchbarType="google"/>
    </div> 

    <div class="iconelement searchsvg">
      <ScholarIcon @click="changeSearch('scholar')"/>
    </div>

    <div id="searchbarScholar" class="iconelement searchbar">
      <SearchItem searchbarType="scholar"/>
    </div> 

    <div class="iconelement">
      <JobIcon />
    </div>

    <div class="iconelement">
      <NetflixIcon />
    </div>

    <div class="iconelement">
      <GitHubIcon />
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
      <PrimeVideoIcon />
    </div>

    <div class="iconelement">
      <BeerwatchIcon />
    </div>

    <div class="iconelement">
      <HbrsIcon />
    </div>

    <div class="iconelement">
      <AmazonIcon />
    </div>

    <div class="iconelement">
      <MailIcon />
    </div>

    <div class="iconelement">
      <TradeRepublicIcon />
    </div>

    <div class="iconelement">
      <SparkasseIcon />
    </div>

    <div class="iconelement">
      <INGIcon />
    </div>
  </div>
</template>

<style scoped>
.desktop-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

</style>

<script>

let changeSearch = (engine) => {
  switch (engine) {
        case "springer":
            const searchbarSpringer = document.getElementById("searchbarSpringer");
            searchbarSpringer.style.display = "flex";
            searchbarSpringer.querySelector(".search-string").focus();
            break;
        
        case "google":
            const searchbarGoogle = document.getElementById("searchbarGoogle");
            searchbarGoogle.style.display = "flex";
            searchbarGoogle.querySelector(".search-string").focus();
            break;
        
        case "scholar":
            const searchbarScholar = document.getElementById("searchbarScholar");
            searchbarScholar.style.display = "flex";
            searchbarScholar.querySelector(".search-string").focus();
            break;

        default:
            break;
    }
}

</script>