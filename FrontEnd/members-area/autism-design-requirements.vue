<template>
  <div class="background">
    <div class="container">
      <TitleAndDivider text="Members Area" :showPSLogo="true" />
      <div class="columns">
        <div class="column is-5">
          <div class="members-nav-container-sticky">
            <PillButton
              destination="/membersarea"
              text="Back to Members Area"
            />
            <p class="members-nav-outline">Outline</p>
            <p
              class="members-nav-title"
              @click="$goToTitle('Autism_Design_Requirements')"
            >
              — Autism Design Requirements
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Adult_Social_Care_Context')"
            >
              — Adult Social Care Context
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('General_building_design_considerations')"
            >
              — General building design considerations
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('10_Principles_for_ASD_friendly_design')"
            >
              — 10 Principles for ASD-friendly design
            </p>
            <p
              class="members-nav-subtitle"
              @click="
                $goToTitle(
                  'The_design_of_the_individual_unit_general_principles'
                )
              "
            >
              — The design of the individual unit – general principles
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Detailed_considerations')"
            >
              — Detailed considerations
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Site_selection_building_grouping_options')"
            >
              — Site selection & building grouping options
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Grouping_options')"
            >
              — Grouping options
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Key_Design_Areas')"
            >
              — Key Design Areas
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Design_Specification_Summary')"
            >
              — Design & Specification Summary
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Autism_Design_References')"
            >
              — Autism Design References
            </p>
          </div>
        </div>
        <div class="column is-7">
          <h1 class="members-title" id="Autism_Design_Requirements">
            Autism Design Requirements
          </h1>
          <p class="members-text">
            Listed below are the key evidence-based principles that need to be
            considered when specifying and designing autism-friendly housing,
            drawn from published literature
          </p>
          <h1 class="members-subtitle" id="Adult_Social_Care_Context">
            Adult Social Care Context
          </h1>
          <Quote :text="quote1.text" :author="quote1.author" />
          <Quote :text="quote2.text" :author="quote2.author" class="mb-6" />
          <p class="members-text">
            Well designed buildings and their immediate environs, tailored where
            possible to the individual’s specific needs reduces high levels of
            building damage and personal stress. Where this is achieved, the
            individual can develop life skills, gain greater independence and
            meet their aspirations and potential.
          </p>
          <h1 class="members-subsubtitle">
            Individuals on the Autism Spectrum tend to share a common number of
            underlying challenges:
          </h1>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list1" :key="i">
              {{ item }}
            </li>
          </ul>
          <h1 class="members-subsubtitle">
            The issues that arise from Autistic Spectrum Disorders (ASDs)
            include:
          </h1>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list2" :key="i">
              {{ item }}
            </li>
          </ul>
          <div class="members-orange-container">
            <p class="members-text">
              Summarised challenges facing this group relevant to building
              design
            </p>
            <Quote :text="quote3.text" :author="quote3.author" class="mb-6" />
            <h1 class="members-subsubtitle">
              Difficulties arising from Autistic Spectrum Disorders (ASDs)
              include:
            </h1>
            <ul class="members-list">
              <li class="members-listitem" v-for="(item, i) in list3" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>
          <h1
            class="members-subtitle"
            id="General_building_design_considerations"
          >
            General building design considerations
          </h1>
          <Quote :text="quote3.text" :author="quote3.author" class="mb-6" />
          <p class="members-text">
            “The essential characteristics of autistic spectrum are reflected in
            the extreme difficulty when changing activity, including simply
            moving from one space to another. The inability to “imagine” and
            create a mental image of what might be at the other side of a door
            is enough to trigger a panic attack.
          </p>
          <p class="members-text">
            The architect solves this problem by “anticipating” the activities
            to be carried out, responding to this inability to create a mental
            image by designing a clear structure and adding elements that
            provide the built element with a certain level of order and unity,
            resulting in a building which is easy to read, predictable and even
            “imaginable”.” (Vázquez & Torres, 2013)
          </p>
          <Quote :text="quote4.text" :author="quote4.author" class="mb-6" />
          <h1
            class="members-subtitle"
            id="10_Principles_for_ASD_friendly_design"
          >
            10 Principles for ASD-friendly design
          </h1>
          <p class="members-text">
            Simon Humphreys (2005) produced 10 simple principles for building
            design:
          </p>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list4" :key="i">
              {{ item }}
            </li>
          </ul>
          <h1
            class="members-subtitle"
            id="The_design_of_the_individual_unit_general_principles"
          >
            The design of the individual unit – general principles
          </h1>
          <p class="members-text">
            Design as a home with a simple layout as similar to a standard house
            or flat as possible.
          </p>
          <p class="members-text">
            Design to avoid triggers or environmental ‘pollutants’ such as noise
            - one of the most common issues raised by occupants. (McGill et al
            ., 2014)
          </p>
          <h1 class="members-subtitle" id="Detailed_considerations">
            Detailed considerations
          </h1>
          <p class="members-text">
            Ideally the specific group needs within the ASD spectrum and the
            level and nature of support staffing are identified prior to
            commencing design. Further into the design process identifying the
            particular needs of actual individuals to occupy the houses allows
            appropriate adaptations to suit.
          </p>
          <p class="members-text">
            The following notes assume the housing is not for the low
            functioning/high support needs ASD group but is for more
            independence capable individuals. It should be noted that this group
            may have greater anxieties than those in more supported units.
            Therefore it is particularly important to consider tailoring the
            detail design to suit individuals to minimise potential issues.
          </p>
          <h1
            class="members-subtitle"
            id="Site_selection_building_grouping_options"
          >
            Site selection & building grouping options
          </h1>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list5" :key="i">
              {{ item }}
            </li>
          </ul>
          <h1 class="members-subtitle" id="Grouping_options">
            Grouping options:
          </h1>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list6" :key="i">
              {{ item }}
            </li>
          </ul>
          <h1 class="members-subtitle" id="Key_Design_Areas">
            Key Design Areas
          </h1>
          <p class="members-text">
            The following key areas need to be considered when developing a
            specification for autism-friendly housing.
          </p>
          <p class="members-text">
            Sondar can provide more detailed specifications for these areas –
            contact Jon Burgoyne, Director of Care & Support:
            <a href="mailto:jon.burgoyne@sondaruk.com"
              >jon.burgoyne@sondaruk.com</a
            >
          </p>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list7" :key="i">
              {{ item }}
            </li>
          </ul>
          <div class="members-oragne-container">
            <h1 class="members-subtitle" id="Design_Specification_Summary">
              Design & Specification Summary
            </h1>
            <p class="members-text">
              Buildings for this user group are more expensive to construct than
              typical flats or houses but with due care in planning the layout
              and the selection/detailing of materials and fittings, there can a
              long term saving on care costs due to more independent living
              being achieved with longer tenancies and reduced repairs if the
              construction is robust
            </p>
            <p class="members-text">
              Retaining a portion of the build budget for the ‘fit out’ stage
              when occupiers have been identified can mean appropriate minor
              amendments can be incorporated that reduce the likely ‘triggers’
              for each individual.
            </p>
          </div>
          <h1 class="members-subtitle" id="Autism_Design_References">
            Autism Design References
          </h1>
          <p class="members-references">
            Attwood, T. (2008) ‘The Complete Guide to Asperger Syndrome: a guide
            for parents and professionals’. London. Jessica Kingsley publishers.
          </p>
          <p class="members-references">
            Brand, A. (2010)‘Living in the Community - Housing Design for Adults
            with Autism’
          </p>
          <p class="members-references">
            Humphreys, S. ‘Autism and Architecture’ in Autism London Bulletin
            Feb – Mar 2005
            <a
              href="http://www.autismlondon.org.uk/pdf-files/bulletin_feb-mar_2005.pdf"
              >http://
              www.autismlondon.org.uk/pdf-files/bulletin_feb-mar_2005.pdf</a
            >
          </p>
          <p class="members-references">
            McGill et al .(2014) ‘Capable Environments’ :
            <a
              href="https://www.kcl.ac.uk/sspp/policyinstitute/scwru/news/2014/newsfolder/McGill-et-al-Capable-environments.pdf"
            >
              https://www.kcl.ac.uk/sspp/policyinstitute/scwru/
              news/2014/newsfolder/McGill-et-al-Capable-environments.pdf
            </a>
          </p>
          <p class="members-references">
            Povey, C. 2015 ‘What should services for people with autism look
            like?’ Advances in Autism Vol 1 , 1.
          </p>
          <p class="members-references">
            The National Autistic Society ‘Autism-friendly design’
            www.autism.org.uk Scottish Autism, ‘Design for Autism’
            <a
              href="http://www.scottishautism.org/about-autism/research-andtraining/design-autism"
              >http://www.scottishautism.org/about-autism/research-andtraining/design-autism</a
            >
          </p>
          <p class="members-references">
            Simpson, S. (2016) ‘Checklist for Autism-Friendly Environments’
            National Institute for Health and Care Excellence
          </p>
          <p class="members-references">
            Whitehurst, T. (2006) ‘The impact of building design on children
            with autistic spectrum disorders’ in GAP Good Autism Practice
          </p>
          <p class="members-references">
            <a
              href="http://www.autism-architects.com/wp-content/uploads/downloads/2012/06/Teresa-WhitehurstImpact-of-Building-Design.-Good-Autism-Practice-2009.pdf"
              >http://www.autism-architects.com/wp-content/uploads/downloads/2012/06/Teresa-WhitehurstImpact-of-Building-Design.-Good-Autism-Practice-2009.pdf
            </a>
          </p>
          <p class="members-references">
            Vázquez FS, Torres AS (2013); ‘Autism and architecture’ Rev Psiq
            Clín. 40(2):85-6
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'userAccess',
  data() {
    return {
      quote1: {
        text:
          'Few user groups are in more need of the possibilities offered by effective architecture than those with challenges and special needs, and no group among those can benefit more from the sensory input that the built environment provides, than those with autism.',
        author: '(NAS, 2015)'
      },
      quote2: {
        text:
          'Providing the right setting can help to enhance motivation, confidence and self-esteem',
        author: 'Andrew Brand/Colum Lowe, 2010'
      },
      quote3: {
        text: `Autism is an extremely complex condition which affects
          each person differently, autism-friendly design requires a
          conceptual framework to be interpreted rather than a set
          of hard-and-fast rules.`,
        author: '(NAS, 2015)'
      },
      quote4: {
        text: `There is still a lack of awareness about how much
          environment can affect people with autism, and architects are
          often unaware of the need to bring in specialists. In addition,
          because autism is an extremely complex condition which
          affects each person differently, autism-friendly design requires
          a conceptual framework to be interpreted rather than a set of
          hard-and-fast rules, which is what architects are used to when
          designing for people with disabilities.`,
        author: '(NAS, 2015)'
      },
      list1: [
        'Difficulties in communication',
        'Difficulties in social interaction',
        'Difficulties with imagination'
      ],
      list2: [
        `Heightened sensory sensitivity: visual, auditory, tactile, olfactory, touch and moving through
          space (poor physical control). Extreme responses to these ‘triggers’ can be felt as physical pain
          or perceptual distortion.`,
        `‘40% of children with autism have some sort of sensory sensitivity…the incidence may be the
          same for Asperger syndrome’ (Attwood, 2008)`,
        `Responses can be hypersensitive or hyposensitive with fixation/avoidance and
          overstimulation/under stimulation behaviour. Over stimulation can lead to building damage and
          challenging behaviour`,
        `Regular routines and predictable activities are preferred. Change is disruptive and can cause
          distress. This means that residents are frequently long term occupants`,
        `Social interaction can be difficult which can lead to isolation and vulnerability. However
          company is appreciated and autistic people are drawn to gatherings/activities. Unexpected
          encounters can cause distress e.g. meeting someone coming round a corner`,
        `Like to be in control`,
        `Literal understanding with inability to think in the abstract, consider cause and effect or be able
          to project situations. Poor awareness of danger. All these make it difficult to discuss designs`,
        `ASD spectrum can come combined with learning, physical or age disabilities with resulting
          additional needs`
      ],
      list3: [
        `Sensory distortion (visual, auditory, tactile, olfactory)`,
        `Perceptual distortion (of light, shade, colour, movement)`,
        `Executive function difficulties (personal organisation and planning)`,
        `Central coherence difficulties (arranging the details/making connections)`,
        `Inflexibility of thought and action (leading to difficulties in making transitions)`,
        `Social interaction difficulties`
      ],
      list4: [
        `A sense of calm and order`,
        `Good levels of natural light and ventilation`,
        `Reduction of detail (complex detail may be too visually stimulating for people with ASD)`,
        `Good proportion`,
        `Proxemics (the mount of space that people feel it necessary to set between themselves`,
        `Containment (ensuring that people with ASD are safe and secure in their environment)`,
        `Easily managed, durable materials`,
        `Good observation`,
        `Good quality acoustics`
      ],
      list5: [
        `Quiet residential areas`,
        `Avoid locations near busy, noisy roads, airports, train lines, noisy commercial sites`,
        `Sufficient site space to avoid overlooking both from occupants to outside and the other way`,
        `Safe locations`,
        `Good pedestrian and public transport links & access to shops, pubs etc`,
        `Shared garden areas can be used for sensory planting and wander loops for de-stressing`
      ],
      list6: [
        `Small blocks of up to 8 rooms with ensuites and shared kitchen and eating areas. On site
          support, communal activity rooms and outdoor spaces. Protected entry & boundaries. Suitable
          for less independent individuals`,
        `1 or 2 bed flats in a small grouping with a staff unit`,
        `Individual houses or flats in a small grouping with visiting support and possibly call out night
          care on site. Frequently for single occupants rather than couples`,
        `Small cluster groupings appear to work well `
      ],
      list7: [
        `Safety`,
        `Building layout & spatial sequencing`,
        `Internal elements`,
        `Walls and doors`,
        `Windows`,
        `Escape/retreat space`,
        `Storage space`,
        `Kitchens`,
        `Bathrooms`,
        `Use of colour & finishes`,
        `Acoustics`,
        `Lighting`,
        `Heating & water temperature`,
        `Assistive technology`,
        `Services and fittings`,
        `Moving in: furnishings and fitting out to suit the individual`,
        `External and common spaces`
      ]
    };
  }
};
</script>

<style scoped>

.background {
  background-color: #f0f0f0;
}

.container {
  margin: 0 auto;
  margin-top: 6rem;
  min-height: calc(100vh - 15rem);
}

@media only screen and (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>