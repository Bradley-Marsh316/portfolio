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
              @click="$goToTitle('Mental_health_friendly_accommodation_design')"
            >
              — Mental health-friendly accommodation design
            </p>
            <p
              class="members-nav-subtitle"
              @click="
                $goToTitle(
                  'Challenges_to_this_group_relevant_to_building_design'
                )
              "
            >
              — Challenges to this group relevant to building design
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Mental_Health_Design')"
            >
              — Mental Health Design
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('What_makes_accommodation_effective?')"
            >
              — What makes accommodation effective?
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('What_makes_accommodation_problematic?')"
            >
              — What makes accommodation problematic?
            </p>
          </div>
        </div>
        <div class="column is-7">
          <h1
            class="members-title"
            id="Mental_health_friendly_accommodation_design"
          >
            Mental health-friendly accommodation design
          </h1>
          <div class="members-orange-container">
            <h1
              class="members-subsubtitle"
              id="Challenges_to_this_group_relevant_to_building_design"
            >
              Challenges to this group relevant to building design
            </h1>
            <p class="members-text">
              The people who need supported accommodation services often have
              severe, complex mental health problems, such as schizophrenia,
              with associated cognitive difficulties that impair their
              organizational skills, motivation and ability to manage activities
              of daily living. Most mental health service-users living in
              independent living accommodation are unemployed, may be socially
              isolated, and many do not participate in community and political
              processes.
            </p>
          </div>
          <h1 class="members-subtitle" id="Mental_Health_Design">
            Mental Health Design
          </h1>
          <p class="members-text">
            Listed below are features of accommodation for which evidence
            exists. There is more evidence of features which have a negative
            effect rather than those which prove positive – this suggests a set
            of minimum standards required for suitable housing. This was echoed
            in service-user testimony, much of which consists of service-users
            stating what they didn’t want
          </p>
          <h1 class="members-subtitle" id="What_makes_accommodation_effective?">
            What makes accommodation effective?
          </h1>
          <div
            v-for="(row, i) in table1"
            :key="`table1${i}`"
            :class="['columns', { 'members-table-white': !(i % 2) }]"
          >
            <div v-for="(col, j) in row" :key="j" class="column is-6">
              <p v-for="(item, k) in col" :key="k" class="members-table-text">
                {{ item }}
              </p>
            </div>
          </div>
          <hr />
          <h1
            class="members-subtitle"
            id="What_makes_accommodation_problematic?"
          >
            What makes accommodation problematic?
          </h1>
          <div
            v-for="(row, i) in table2"
            :key="`table2${i}`"
            :class="['columns', { 'members-table-white': !(i % 2) }]"
          >
            <div v-for="(col, j) in row" :key="`row${j}`" class="column is-6">
              <p
                v-for="(item, k) in col"
                :key="`item${k}`"
                class="members-table-text"
              >
                {{ item }}
              </p>
            </div>
          </div>
          <hr />
          <div class="members-orange-container">
            <h1 class="members-subsubtitle">Design requirements summary</h1>
            <ul class="members-list">
              <li
                class="members-listitem"
                v-for="(item, i) in list1"
                :key="`container${i}`"
              >
                {{ item }}
              </li>
            </ul>
          </div>
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
      table1: [
        [
          [
            `Access to gardens / green open
              spaces /natural views`
          ],
          [
            `Exposure to natural elements such as trees, water, and
              landscapes tends to replenish cognitive energy.`,
            `Similar effects from views of nature, landscape paintings, and
              indoor plants.`
          ]
        ],
        [
          [`Private, lockable space`],
          [
            `Specifically a place where people can be alone and includes
              space to securely store personal items.`
          ]
        ],
        [
          [`Good quality housing`],
          [
            `Evidence of positive effects relate mainly to benefits of rehousing the most vulnerable, strong evidence for negative effects of poor quality accommodation.`
          ]
        ],
        [
          [`Low noise levels`],
          [
            `Little quantitative evidence, but cited as a positive feature in
              some qualitative studies, strong evidence for negative effects
              of high noise.`
          ]
        ],
        [
          [
            `Furniture arranged to promote
              social interaction`
          ],
          [
            `Can facilitate increased social support in communal areas,
              more effective where people can view communal area before
              deciding whether to enter. `
          ]
        ],
        [
          [`Good illumination and natural lighting`],
          [
            `Sunny rooms shown to be effective in treating depression,
              negative effects of lack of exposure to daylight include
              Seasonal Affective Disorder (SAD). Colour shown to have no
              effects.`
          ]
        ]
      ],
      table2: [
        [
          [`Poor housing quality`],
          [
            `Significant negative effects linked to structural quality,
              maintenance and upkeep, and amenities. Includes cleanliness
              and decoration – closely related to effectiveness of housing
              management. Damp well-documented as problem affecting
              both physical and mental health.`
          ]
        ],
        [
          [`High crime areas`],
          [
            `Neighbourhood violence, neighbourhood disorder associated
              with anxiety. May be linked to areas which are difficult to
              monitor and associated lack of control and feelings of
              helplessness.`
          ]
        ],
        [
          [`Areas with a concentration of deck –access blocks of flats`],
          [
            `Depression was associated with living in areas characterised
              by dwellings with deck access and those of post -1969
              construction. May be linked to lack of ‘defensible space’ in
              front of homes.`
          ]
        ],
        [
          [`Long corridors`],
          [
            `A problematic architectural feature as it tends to create uncontrollable social interaction.`
          ]
        ],
        [
          [`Crowding`],
          [
            `Dwelling level - tends to cause reduced social interaction and
              withdrawal. Supported by experimental testing under
              laboratory type conditions`,
            `Neighbourhood level – non-working adults more susceptible to negative effects.`
          ]
        ],
        [
          [`Noise`],
          [
            `Linked to lack of control and associated feelings of helplessness. Road traffic noise linked to increased anxiety.`
          ]
        ]
      ],
      list1: [
        `Access to gardens / green open spaces /natural views with shaded areas for seating`,
        `Garden to give scope for residents to grow plants/vegetables eg raised beds`,
        `High levels of noise insulation from both internal and external noise`,
        `High levels of natural lighting in bedrooms and communal areas`,
        `Communal lounges with glass panels to enable viewing before entering, furniture to
          encourage socialising`,
        `Buildings to have good security features and defensible space in front`,
        `Long corridors with facing front doors should be avoided`
      ]
    };
  }
};
</script>

<style lang="scss" scoped>

.background {
  background-color: #f0f0f0;
}

.container {
  margin: 0 auto;
  margin-top: 6rem;
  min-height: calc(100vh - 15rem);
}

hr {
  border-top: 2px solid $primary;
  width: 100%;
  margin-bottom: 3rem;
}

@media only screen and (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>