<template></template>

<script>
export default {
  middleware: [
    function ({ redirect }) {
      return redirect('/membersarea');
    }
  ]
};
</script>

<style>
</style>