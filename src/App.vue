<template>
    <div id="app">
        <div v-if="isCreateWorkflow">
            <calendar-notification :id="wfId" @cancel-workflow-creation="cancelWorkflowCreation"></calendar-notification>
        </div>
        <div v-else>
            <h1>Available workflows</h1>
            <div class="workflowItemsContainer" >
                <workflow v-for="wItem in WorkflowList" :key="wItem.id" :id="wItem.id" :workflowLabel="wItem.type" @show-create-workflow="showCreateWorkflow(wItem.id)"></workflow>
            </div>
        </div>
    </div>
</template>

<script>
    import CalendarNotification from './components/CalendarNotification.vue';
    import Workflow from './components/Workflow.vue';
    import uniqueId from 'lodash.uniqueid';

    export default {
        components: {
            CalendarNotification,
            Workflow
        },
        data() {
            return {
                WorkflowList: [{
                    id: uniqueId('workflow-'),
                    type: 'Sales',
                    config: {}
                }, {
                    id: uniqueId('workflow-'),
                    type: 'Discovery',
                    config: {}
                }, {
                    id: uniqueId('workflow-'),
                    type: 'Calendar Notification',
                    config: {}
                }],
                isCreateWorkflow: false,
                wfId: ''
            }
        },
        methods: {
            showCreateWorkflow(wfId) {
                console.log("wfId:", wfId);
                this.wfId = wfId;
                this.isCreateWorkflow = true;

            },
            cancelWorkflowCreation() {
                console.log("Cancel WF from App.vue");
                this.isCreateWorkflow = false;

            }
        }
    }
</script>

<style>
    #app {
        font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI emoji;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .workflowItemsContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
    }
</style>
