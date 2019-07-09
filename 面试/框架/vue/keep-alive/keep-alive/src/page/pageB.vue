<template>
    <div>
        页面b
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    beforeRouteLeave(to, from, next){
      to.meta.keepAlive = false;
        next()
    }
}
</script>
<style scoped>

</style>
