<template>
  <div>
    <FloorPlan v-for="(drawnPlan, index) in drawnPlans" :key="index" :floorPlan="drawnPlan" />
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      drawnPlans: [
        {
          title: 'Bedsit with ensuite',
          description: ['Entrance door recessed off corridor', 'Cupboard storage', 'Bed', 'Bay window with desk option', 'Shower or bath ensuite with sliding door'],
          size: 'Approx. 15 MSQ',
          sharedFacilities: 'Assumes shared facilities also provided',
          image: 'Bedsit1Small.png',
        },
        {
          title: 'Bedsit with ensuite & kitchen',
          description: ['Entrance door', 'Cupboard storage', 'Bed', 'Bay window with desk option', 'Shower or bath ensuite with sliding', 'Kitchenette with option sliding door', 'Small table'],
          size: 'Approx. 20 MSQ',
          sharedFacilities: 'Assumes shared facilities also provided',
          image: 'Bedsit2Small.png',
        },
        {
          title: 'One bed flat with kitchen & bathroom',
          description: ['Entrance door', 'Hall with cupboard storage', 'Bedroom', 'Bed', 'Cupboard storage', 'Bay window with desk option', 'Shower or bath ensuite with sliding door', 'Kitchen', 'Living/Dining room', 'Table for meals'],
          size: 'Approx. 43 MSQ',
          image: 'OneBedFlatKitchenBedroomSmall.png',
        },
        {
          title: 'Two bed with ensuites flat with kitchen/dining & lounge',
          description: ['Entrance door', 'Hall', 'Dining/Kitchen', 'Bedroom', 'Bed', 'Cupboard storage', 'Bay windows with desk option', 'Shower or bath ensuite with sliding door', 'Living room'],
          size: 'Approx. 76 MSQ',
          sharedFacilities: 'Assumes small shared activity room or similar',
          image: 'TwoBedSmall.png',
        },
        {
          title: 'Three bedsits with ensuites & staff bed for 3 bed house',
          description: ['Entrance door', 'Desk or soft seating', 'Bed', 'Bay window with window seat/drawers', 'Shower or bath ensuite with sliding door', 'Staff overnight accomodation'],
          size: 'Approx. 120-150 MSQ Q/A house',
          sharedFacilities: 'Arrangement with shared kitchen/dining & lounge',
          image: 'ThreeBedSmall.png',
        }
      ]
    }
  }
}
</script>