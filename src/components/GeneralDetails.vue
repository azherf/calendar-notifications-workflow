<template>
    <div class="generalDetailsMainContainer">
        <form>
            <div class="nameField">
                <label for="wf-name" class="wf-label">Name:</label>
                <input type="text" id="wf-name" name="wf-name" v-model.lazy.trim="wfName" class="wf-input"> 
            </div>
            <div class="DescriptionField">
                <label for="wf-description" class="wf-label">Description:</label>
                <textarea id="wf-description" name="wf-description" v-model.lazy.trim="wfDescription" class="wf-textarea"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
    // import Vue from 'vue';
    export default {
        // props: {
        //     bus: {
        //         type: Vue
        //     }
        // },
        data() {
            return {
                wfName: "",
                wfDescription: ""
            }
        },
        method: {
            submitGeneralDetails() {
                console.log("Submitting General Details", this.wfName, this.wfDescription);
            },
        },
        // mounted() {
        //     console.log("mounted inside child");
        //     // this.$eventBus.$on('submitGeneralDetails', this.submitGeneralDetails);        
        // }
    }
</script>

<style scoped>
    .generalDetailsMainContainer {
        padding: 10px;
    }
</style>