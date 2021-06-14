<template>
  <div class="background">
    <div class="container">
      <TitleAndDivider text="Members Area" :showPSLogo="true" />
      <div class="columns">
        <div class="column is-5">
          <div class="search-container mb-4">
            <input
              type="text"
              class="search"
              v-model="searchTerm"
              placeholder="Search for content"
            />
          </div>
          <PillButton
            v-for="(content, i) in filteredResults"
            :destination="content.link"
            :whiteButton="true"
            :fullWidth="true"
            :text="content.title"
            :key="i"
          />
        </div>
        <div class="column is-7">
          <h1 class="title">What is this area?</h1>
          <p class="text">
            This area is intended to provide general guidance for the design and
            specification of specialised supported housing. This guidance is
            based on evidence drawn from published literature, and also the
            experience of our partner architects Helen Pedder & Gill Scampton in
            designing and developing autism-friendly schemes.
          </p>
          <br />
          <p class="text">
            The following pages provide general guidance, but we are able to
            provide more detailed specifications on application – please contact
            Jon.
          </p>
          <br />
          <p class="text">
            We plan to regularly review and update these pages as further
            research emerges. We will also be adding pages with guidance for the
            design of dementia-friendly accommodation.
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
      title: 'Sondar UK | Members Area',
      membersContent: [
        {
          link: '/membersarea/AutismDesignRequirements',
          title: 'Autism Design Requirements'
        },
        {
          link: '/membersarea/DesigningForIndependentLivingForAllGroups',
          title: 'Designing for Independent Living for all groups'
        },
        {
          link: '/membersarea/MentalHealthFriendlyAccomodationDesign',
          title: 'Mental health-friendly accommodation design'
        }
      ],
      searchTerm: ''
    };
  },
  computed: {
    filteredResults() {
      if (this.searchTerm === '') return this.membersContent;
      return this.membersContent.filter(content =>
        content.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'membersarea',
          name: 'members area',
          content: 'Members area page'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.background {
  background-color: #f0f0f0;
}

.button {
  border-radius: 0px;
  width: 100%;
  height: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.button-container {
  width: 50%;
}

.container {
  margin: 0 auto;
  margin-top: 6rem;
  min-height: calc(100vh - 15rem);
}

.membersarea-container {
  width: 100%;
  display: flex;
  float: right;
}

.search {
  width: 100%;
  border-radius: 50px;
  background-color: white;
  color: black;
  outline: none;
  border: none;
  height: 2rem;
  padding-left: 1rem;
}

.search:focus {
  outline: none;
}

.text {
  color: black;
  font-size: 1rem;
}

.text-container {
  width: 50%;
  margin-left: auto;
}

.title {
  color: $primary;
  font-weight: 600;
  font-size: 3rem;
}

@media only screen and (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media only screen and (max-width: 768px) {
  .button-container {
    width: 100%;
  }
}
</style>