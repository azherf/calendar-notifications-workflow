<template>
    <div class="workflowItem" :id="id" @click="workflowClicked">{{workflowLabel}}</div>
</template>

<script>
    export default {
        props: {
            workflowLabel: {
                required: true,
                type: String
            }, id: {
                required: true,
                type: String
            }
        },
        methods: {
            workflowClicked() {
                console.log('Item clicked');
                this.$emit('show-create-workflow');
            }
        }
    }
</script>

<style>
    .workflowItem {
        border: 1px solid #d9d9d9;
        flex: 1 1 auto;
        padding: 15px;
        margin: 15px;
        position: relative;
    }

    .workflowItem:hover {
        cursor: pointer;
    }

    .workflowItem:hover:after {
        font-size: 40px;
        content: '+';
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        right: 0;
    }
    
</style>