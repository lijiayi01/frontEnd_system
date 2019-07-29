<template>
    <div>
        list
    </div>
</template>
<script>
export default {
     beforeRouteLeave(to, from, next){
      to.meta.keepAlive = true;
        next()
    },
    
}
</script>
<style scoped>

</style>
