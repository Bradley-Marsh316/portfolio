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
              @click="
                $goToTitle('Designing_for_Independent_Living_for_all_groups')
              "
            >
              — Designing for Independent Living for all groups
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('External features')"
            >
              — External features
            </p>
            <p
              class="members-nav-subsubtitle"
              @click="$goToTitle('Local Context')"
            >
              — Local Context
            </p>
            <p
              class="members-nav-subsubtitle"
              @click="$goToTitle('Boundaries/fencing')"
            >
              — Boundaries/fencing
            </p>
            <p
              class="members-nav-subtitle"
              @click="$goToTitle('Internal design')"
            >
              — Internal design
            </p>
            <p
              v-for="(item, i) in lists"
              :key="i"
              class="members-nav-subsubtitle"
              @click="$goToTitle(item.title)"
            >
              — {{ item.title }}
            </p>
          </div>
        </div>
        <div class="column is-7">
          <h1
            class="members-title"
            id="Designing_for_Independent_Living_for_all_groups"
          >
            Designing for Independent Living for all groups
          </h1>
          <Quote :text="quote1.text" :author="quote1.author" class="mb-6" />
          <div class="members-orange-container">
            <h1
              class="members-subsubtitle"
              id="Challenges_facing_all_customer_groups_requiring_specialised_independent_living_accommodation"
            >
              Challenges facing all customer groups requiring specialised
              independent living accommodation
            </h1>
            <p class="members-text">
              People needing specialised accommodation to support independent
              living are much more likely to be sensitive to ‘built environment’
              factors which a!ect mental health: noise (tra!ic noise and from
              other occupants), need for secure private space, crowding,
              availability of natural light, control and social interaction,
              access to natural elements (gardens etc), safety and security
              (actual and perceived).
            </p>
            <p class="members-text">
              Additional design considerations may include:
            </p>
            <ul class="members-list">
              <li class="members-listitem" v-for="(item, i) in list1" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>
          <p class="members-text">
            The following key areas need to be considered when developing a
            specification suitable for ‘independent living’ housing which works
            for a range of users, and allows flexibility for future use/ changes
            of user groups.
          </p>
          <p class="members-text">
            Sondar can provide more detailed specifications for these areas –
            contact Jon Burgoyne, Director of Care & Support:
            <a href="mailto:jon.burgoyne@sondaruk.com"
              >jon.burgoyne@sondaruk.com</a
            >
          </p>
          <p class="members-subtitle" id="External_features">
            External features
          </p>
          <p class="members-subsubtitle-bold" id="Local_Context">
            Local Context
          </p>
          <p class="members-text">
            The requirement for the layout and appearance of buildings should be
            based on an appraisal of the character of the site including
            buildings and land in the surrounding local area. The design must
            meet and raise the general aspirations and expectations of local
            residents.
          </p>
          <ul class="members-list">
            <li class="members-listitem" v-for="(item, i) in list2" :key="i">
              {{ item }}
            </li>
          </ul>
          <p class="members-text">
            ‘lighting along the main routes of pathways so that the garden can
            be used safely in the evening. Good lighting is also required to all
            parking areas to provide surveillance lighting and CCTV as required
            for security.’
          </p>
          <p class="members-text">
            Good access to public transport links (consideration to be given to
            moving bus stops for larger schemes) and community facilities such
            as health services and shops to support independent living
          </p>
          <p class="members-subsubtitle-bold" id="Boundaries/fencing">
            Boundaries/fencing
          </p>
          <p class="members-text">
            Schemes to have a secure perimeter fencing for security and privacy.
            Fencing levels to be raised where overlooked by use of willow
            screening or similar to allow residents to use garden without being
            overlooked.
          </p>
          <p class="members-text">
            Some raised beds to be provided where possible to give residents
            potential for growing plats/ vegetables.
          </p>
          <p class="members-text">
            Provision of benches and sheltered/shaded seating areas where garden
            size is su!icient. Paved or decked patio area which allows
            accessible space for barbecues and social activities in garden.
          </p>
          <h1 class="members-subtitle" id="Internal_design">Internal design</h1>
          <p class="members-text">
            Listed below are keys areas and factors to be considered
          </p>
          <div v-for="(item, i) in lists" :key="i">
            <p class="members-subsubtitle-bold" :id="generateID(item.title)">
              {{ item.title }}
            </p>
            <ul class="members-list">
              <li
                class="members-listitem"
                v-for="(listItem, j) in item.list"
                :key="j"
              >
                {{ listItem }}
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
      quote1: {
        text: `An impairment becomes a disability only when the built environment does not compensate for impairments`,
        author: `(Utton, 2009)`
      },
      list1: [
        `Visual impairments including loss of spatial awareness`,
        `Reduced physical mobility`,
        `Social isolation (including cultural)`,
        `Flexible design which allows tenants to 'age in place' rather than moving to hospital
          or more adapted accommodation`
      ],
      list2: [
        `Set back from busy road and/or shielded/insulated to minimise road tra!ic noise`,
        `Defensible space’ in front of homes`
      ],
      lists: [
        {
          title: 'General',
          list: [
            `Illumination and good natural lighting`,
            `Levels of detail – relevant to LD/Autism and dementia schemes`,
            `Cultural diversity of intended occupants `
          ]
        },
        {
          title: 'Signage',
          list: [`Levels/lettering for those with visual impairments`]
        },
        {
          title: 'Entrance',
          list: [
            `Lighting/entryphone systems`,
            `Factors relevant to wheelchair users Lift specifications to suit a range of needs `
          ]
        },
        {
          title: 'Corridors',
          list: [
            `Lengths of corridors, and aspects`,
            `Orientation, seating options, social interaction`
          ]
        },
        {
          title: 'Bedrooms',
          list: [`Entrances and ways to enable recognition`]
        },
        {
          title: 'Bathrooms/showers',
          list: [`Features to assist those with visual / spatial impairments`]
        },
        {
          title: 'Communal areas',
          list: [
            `Views to enhance wellbeing`,
            `Enabling residents to view communal area before deciding whether to enter`,
            `Furniture arrangement`,
            `Features for those with hearing di!iculties`
          ]
        },
        {
          title: 'Lighting',
          list: [
            `How to make adjustable / controllable / adaptable and requisite power and type`,
            `Maximisation of natural lighting`,
            `Improving usability of kitchens`
          ]
        },
        {
          title: 'Acoustics',
          list: [
            `Acoustic separation within the building`,
            `Materials / surface e!ects`,
            `Flooring contribution to acoustics`,
            `Allowing open o!ices and easier access`
          ]
        },
        {
          title: 'Finishes',
          list: [
            `Role of surfaces - flooring, kitchens etc`,
            `Contrast levels for those with visual impairments`,
            `Use and role of colours`,
            `Acoustic qualities`
          ]
        },
        {
          title: 'Floor coverings',
          list: [
            `Required qualities and properties for di!erent areas of the building`
          ]
        },
        {
          title: 'Ventilation/cooling',
          list: [
            `Required qualities and properties for di!erent areas of the building`
          ]
        },
        {
          title: 'Ventilation/cooling',
          list: [`Considerations for long-term usability and future-proofing`]
        },
        {
          title: 'Storage space',
          list: [`Value and contribution to overall usability `]
        },
        {
          title: 'Ceilings',
          list: [`Considerations to allow future adaptations and accessibility`]
        },
        {
          title: 'Fire alarms',
          list: [`Suitability for those with visual and/or hearing impairments`]
        },
        {
          title: 'Plug sockets',
          list: [`Visibility and usability for a range of users`]
        },
        {
          title: 'Locks',
          list: [`Type and placement`]
        },
        {
          title: 'Hook/clothes hooks',
          list: [`Placement and safety.`]
        }
      ]
    };
  },
  methods: {
    generateID(id) {
      return id.replace(' &', '').replace(' ', '_').replace('-', '_');
    }
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