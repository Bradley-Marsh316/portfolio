<template>
  <div class="columns is-multiline">
    <div class="column is-5">
      <Quote :text="quote.text" :author="quote.author" />
    </div>
    <div class="column"></div>
    <div class="column is-6">
      <div class="image-outside"></div>
    </div>
    <div class="column is-5">
      <h1 class="title">Our Offer</h1>
      <p class="subtitle">
        Sondar are able to offer a variety of flexible development options
        from new build campus type developments as shown on the front
        cover, to smaller units or remodelling of existing buildings.
      </p>
      <ul>
        <li class="subtitle">
          Using its network Sondar can source a variety of sites suitable for
          autism developments.
        </li>
        <li class="subtitle">
          We are open to a range of options to finance development of
          accommodation including ‘turnkey’ or ‘golden brick’ purchase or
          leasing arrangements, and grant funding opportunities.
        </li>
        <li class="subtitle">
          We are happy to work with a variety of stakeholders to develop a
          specification which best meets the needs of your service-users
          through a series of design workshops.
        </li>
        <li class="subtitle">
          Sondar is developing expertise in sourcing a range of autism-
          friendly fixtures and fittings.
        </li>
      </ul>
    </div>
    <div class="column"></div>
    <div class="column is-6 content-column">
      <div class="image-inside"></div>
      <div class="contact-box">
        <h1 class="contact-title text-white">Get in touch!</h1>
        <p class="subtitle text-white">Phone: 0208 075 4255</p>
        <p class="subtitle text-white">Email: <a href="mailto:info@sondaruk.com" class="text-white">info@sondaruk.com</a></p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      quote: {
        text: 'Service commissioners should invest in the development of local, capable environments rather than expensive, out-of-area placements of dubious quality.',
        author: 'McGGill et al ‘Capable Environments’ 2014'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.contact-box {
  padding: 1rem;
  height: 11rem;
  background-color: $primary;
  justify-content: flex-end;
}

.content-column {
  align-self: flex-end;
  justify-content: space-between;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 600;
}

.image-inside {
  height: 250px;
  background-image: url('../../assets/images/Stock/FrontOfBuildings.jpg');
  background-position: center;
  background-size: cover;
  margin-bottom: 3rem;
}

.image-outside {
  height: 250px;
  background-image: url('../../assets/images/Stock/OutsideShot.jpg');
  background-position: center;
  background-size: cover;
}

li {
  margin-left: 1rem;
}

li::marker {
  color: $primary;
}

.subtitle {
  color: black;
}

.title {
  color: $primary;
}

ul {
  list-style: square outside none;
}

</style>