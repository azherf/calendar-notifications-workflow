<template>
    <div id="app">
        <div v-if="isCreateWorkflow">
            <add-calendar-notifications></add-calendar-notifications>
        </div>
        <div v-else>
            <h1>Available workflows</h1>
            <div class="workflowItemsContainer" >
                <workflows v-for="witem in WorkflowList" :key="witem.id" :id="witem.id" :workflowLabel="witem.name" @show-create-workflow="showCreateWorkflow"></workflows>
            </div>
        </div>
    </div>
</template>

<script>
    import AddCalendarNotifications from './components/AddCalendarNotifications.vue';
    import Workflows from './components/Workflows.vue';
    import uniqueId from 'lodash.uniqueid';

    export default {
        components: {
            AddCalendarNotifications,
            Workflows
        },
        data() {
            return {
                WorkflowList: [{
                    id: uniqueId('workflow-'),
                    name: 'Sales'
                }, {
                    id: uniqueId('workflow-'),
                    name: 'Discovery'
                }, {
                    id: uniqueId('workflow-'),
                    name: 'Calendar Notifications'
                }],
                isCreateWorkflow: false
            }
        },
        methods: {
            showCreateWorkflow() {
                console.log("Bubbled event");
                this.isCreateWorkflow = true;
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .workflowItemsContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
    }
</style>
