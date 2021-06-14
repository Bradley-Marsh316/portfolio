<template>
  <div>
    <div class="columns">
      <div class="column is-12">
        <h1 class="title">Key for typical plan for autism flat</h1>
        <p class="subtitle mb-6">
          Scheme for small cluster development of 1 bed flats for supported independent living for singles or
          couples with autism. Support staff in one unit. Shared activity gardens and rooms at more secluded
          end of the street with a higher needs block of bedsits in group living format.
        </p>
        <h1 class="title">Construction and materials</h1>
        <p class="subtitle">
          Materials used include brick, timber cladding and triple glazed windows. Robust construction both externally and internally
          with high grade acoustic separation between flats above and to each side. Optional planted roofs
          which deaden external noise.
        </p>
        <p class="subtitle">
          Alternative: pitched or monopitch roofs with high level windows for indirect daylight to the upper
          flats. Solar pv’s on the roofs (subject to site orientation) and high thermal performance to achieve
          even internal temperatures.
        </p>
        <p class="subtitle">
          While the layout is similar to ordinary accommodation that the occupant may be familiar with, these
          flats are slightly larger than housing standards to give more space for those with poor spatial co-
          ordination and for those being assisted by care support.
        </p>
        <p class="subtitle">
          Layouts can be adapted to an individual’s particular needs. For instance sliding doors can be
          installed between the key rooms if an internal ‘circuit’ is required or for staff safety. Curved corners
          added to built in furniture and some walls to reduce injury if proprioception is poor. Additional
          monitoring and alarm systems can be connected to an infrastructure built into the dwelling, such as
          overflowing water alarm in the bathroom, tailored to suit the occupant.
        </p>
      </div>
      <div class="column is-3">

      </div>
    </div>
    <hr>
    <h1 class="title">Click any image below to see the full plan</h1>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="(plan, index) in plans" :key="index">
        <HousePlan :index="index + 1" :title="plan.title" :description="plan.description" :image="plan.image" @image-clicked="openModal"/>
      </div>
    </div>
    <hr>
    <div class="modal" :class="{'is-active': modalActive}">
      <div class="modal-background" @click="modalActive = false"></div>
      <div class="modal-content">
        <p class="image">
          <img :src="require('~/assets/images/Plans/FullPlan.png')" alt="">
        </p>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="modalActive = false"></button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  scrollToTop: true,
  data() {
    return {
      modalActive: false,
      plans: [
        {
          title: "Living Space",
          description: "Large living room with option for TV in a built-in cabinet. Large enough for the furniture to be moved around or to have a cabinet or desk for particular interests. Double doors with level exit onto a paved area in the garden. At first floor the doors will be onto a balcony fully enclosed with open screening designed to avoid ‘posting’ and climbing out.",
          image: "Living.png"
        },
        {
          title: "Cooking",
          description: "Cooking and eating in one room. Kitchen layout permits cooking activity with a care support either side of the counter. Eating area has a bay window seat. This provides good daylight into this deeper room reducing the need for artificial lighting while also giving a place to site and watch activity on the street while being separated by the glazing and external planting. A small ‘peep’ window gives the occupant the chance to check who is at the front door.",
          image: "Cooking.png"
        },
        {
          title: "Hallway and Bathroom",
          description: "Generous hall space: internal liminal space for pausing before going out as well as being a space without a room designation for a particular activity. Ample, lockable storage. Bathroom plumbed to permit a bath or a shower to suit the occupant’s preference, with floor drain.",
          image: "HallwayAndBathroom.png"
        },
        {
          title: "Front Door and outside",
          description: "Private entrances to each flat: sheltered pause space before coming out onto the street for occupant to avoid unexpected encounters. Pavement past dwellings: street movement, interest. Private road off residential street. Avoids through traffic while embedded within an existing residential area. Parking bays, trees and a densely planted boundary provide a buffer between the development and adjacent family houses/gardens. Visual and aural privacy/separation for both the residents and neighbours.",
          image: "FrontDoorAndPavement.png"
        },
        {
          title: "Garden",
          description: "Shared communal or individual gardens depending on the occupant. The gardens provide a buffer between adjacent sites and the flats as well as potential private greenspace for wandering, planting activities etc.",
          image: "Garden.png"
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['setSelectedMenuIndex']),
    openModal() {
      this.modalActive = true;
    }
  },
  mounted() {
    this.setSelectedMenuIndex(0);
  }
}
</script>

<style lang="scss" scoped>

hr {
  border-top: 2px solid $primary;
  width: 100%;
  margin-bottom: 3rem;
}

.modal-content {
  width: 50vw;
  height: 90vh;
}

.subtitle {
  color: black;
}

.title {
  color: $primary;
  margin-bottom: 4rem !important;
}

@media only screen and (max-width: 768px) {
  .modal-content {
    width: 90vw;
  }
}

</style>