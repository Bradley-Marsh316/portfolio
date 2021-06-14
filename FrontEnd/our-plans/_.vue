<script>
export default {
  middleware: [
    function({ redirect }) {
      return redirect('/ourplans')
    }
  ]
}
</script>