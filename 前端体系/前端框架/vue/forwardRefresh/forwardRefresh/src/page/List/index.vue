<template>
    <div>
        <div>商品列表</div>
        <ul>
            <li v-for="item in list"  :key="item.id" class="goods_item" @click="href(item.id)">
                <div>{{item.name}}</div>
                <div>{{item.desc}}</div>
                <div>{{item.price}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'list',
    data(){
        return {
            list:[]
        }
    },
    mounted () {
        this.getList()
    },

    methods: {
        getList(){
            this.$http.get('./static/data/data.json').then((res)=>{
                console.log(typeof res.data)
                let re = res.data;
                
                this.list = re.data.list
            })
        },
        href(param){
            this.$router.push('/detail/'+param)
        }
    }

}
</script>

<style>
.goods_item{
    border:1px dashed #ccc;
    margin-top:30px
}
</style>
