<template>
    <div>
        <div class="addCalenNotifHeader">
            <h2 class="notifTitle">Create Notifications Workflow</h2>
            <span class="cancelIcon" @click="cancelWorkflowCreation">x</span>
        </div>
        <vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked">
            <div slot="page1">
                <!-- <general-details :bus="bus" ref="gdForm"></general-details> -->
                <template>
                    <div class="generalDetailsMainContainer">
                        <form>
                            <div class="nameField">
                                <label for="wf-name" class="wf-label">Name:</label>
                                <input type="text" id="wf-name" name="wf-name" v-model.lazy.trim="config.generalDetails.wfName" class="wf-input"> 
                            </div>
                            <div class="DescriptionField">
                                <label for="wf-description" class="wf-label">Description:</label>
                                <textarea id="wf-description" name="wf-description" v-model.lazy.trim="config.generalDetails.wfDescription" class="wf-textarea"></textarea>
                            </div>
                        </form>
                    </div>
                </template>
            </div>
            <div slot="page2">
                <template>
                    <div class="integrationTypesMainContainer">
                        <div class="nonSelectedList">
                            <div class="integrationType" v-for="itype in IntegrationTypes" :key="itype.id">
                                <img class="integrationTypeImage" :src="require('../' + itype.image)" >
                                {{itype.name}}
                            </div>    
                        </div>
                        <div class="selectedList">
                            <div class="integrationType" v-for="itype in IntegrationTypes" :key="itype.id">
                                <img class="integrationTypeImage" :src="require('../' + itype.image)" >
                                {{itype.name}}
                            </div>    
                        </div>
                    </div>
                </template>
            </div>
            <div slot="page3">
                <template>
                    <div class="integrationTypesMainContainer roles">
                        <div class="nonSelectedList">
                            <div class="integrationType" v-for="role in Roles" :key="role.id">
                                {{role.name}}
                            </div>    
                        </div>
                        <div class="selectedList">
                            <div class="integrationType" v-for="role in Roles" :key="role.id">
                                {{role.name}}
                            </div>    
                        </div>
                    </div>
                </template>
            </div>
            <div slot="page4">
                <h4>Step 4</h4>
                <p>Select Outbound Channels</p>
            </div>
            <div slot="page5">
                <h4>Step 5</h4>
                <p>This is the summary page</p>
            </div>
        </vue-good-wizard>
    </div>
</template>

<script>
    // import GeneralDetails from './GeneralDetails.vue';
    // import Vue from 'vue';
    // import HelloWorld from './HelloWorld.vue';
    import uniqueId from 'lodash.uniqueid';

    export default {
        name: "calendar-notifications",
        components: {
            // GeneralDetails,
            // HelloWorld
        },
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                steps: [
                    {
                        label: "General Details",
                        slot: "page1",
                        id: "generalDetails"
                    }, {
                        label: "Add Inbound Integration Types",
                        slot: "page2",
                        id: "integrationTypes"
                    }, {
                        label: "Select Roles and Templates",
                        slot: "page3",
                        id: "rolesAndTemplates"
                    }, {
                        label: "Select Outbound Channels",
                        slot: "page4",
                        id: "outboundChannels"
                    }, {
                        label: "Summary",
                        slot: "page5",
                        id: "summary"
                    },
                ], 
                IntegrationTypes: [
                    {
                        id: uniqueId("itype-"),
                        name: "Momentum",
                        image: "assets/momentum.jpeg"
                    }, {
                        id: uniqueId("itype-"),
                        name: "Outlook Calendar",
                        image: "assets/outlook.png"
                    }, {
                        id: uniqueId("itype-"),
                        name: "Google Calendar",
                        image: "assets/google-calendar.png"
                    }
                ],
                Roles: [
                    {
                        id: uniqueId('role-'),
                        name: 'H.R'
                    }, {
                        id: uniqueId('role-'),
                        name: 'V.P'
                    }, {
                        id: uniqueId('role-'),
                        name: 'C.O.O'
                    }, {
                        id: uniqueId('role-'),
                        name: 'A.E'
                    }, {
                        id: uniqueId('role-'),
                        name: 'Legal'
                    }                
                ],
                Templates: [
                    {
                        id: uniqueId('template-'),
                        name: 'HR Template',
                        title: 'Sample HR Title',
                        content: "Hi {{name}}, ....",
                        attachments: [
                            {
                                id: uniqueId('attach-'),
                                name: "abc.pdf",
                                extension: "pdf"
                            }, {
                                id: uniqueId('attach-'),
                                name: "def.pdf",
                                extension: "pdf"
                            }, {
                                id: uniqueId('attach-'),
                                name: "xyz.xlsx",
                                extension: "xlsx"
                            }
                        ]
                    }, {
                        id: uniqueId('template-'),
                        name: 'Legal Template',
                        title: 'Sample Legal Title',
                        content: "Hi {{name}}, ....",
                        attachments: [
                            {
                                id: uniqueId('attach-'),
                                name: "abc.pdf",
                                extension: "pdf"
                            }, {
                                id: uniqueId('attach-'),
                                name: "def.pdf",
                                extension: "pdf"
                            }, {
                                id: uniqueId('attach-'),
                                name: "xyz.xlsx",
                                extension: "xlsx"
                            }
                        ]
                    }
                ],
                OutboundChannels: [
                    {
                        id: uniqueId("outbound-"),
                        name: "Outlook 365",
                        image: "assets/outlook.png"
                    },  {
                        id: uniqueId("outbound-"),
                        name: "MS Teams",
                        image: "assets/ms-teams.png"
                    }, {
                        id: uniqueId("outbound-"),
                        name: "Gmail",
                        image: "assets/gmail.png"
                    },  {
                        id: uniqueId("outbound-"),
                        name: "Slack",
                        image: "assets/slack.png"
                    }
                ],
                config: {
                    generalDetails: {
                        wfName: "",
                        wfDescription: "",
                    }
                }
            };
        },
        methods: {
            nextClicked(currentPage) {
                console.log("next clicked", currentPage);
                if(currentPage === 0) {
                    this.submitStep1();
                }
                return true; //return false if you want to prevent moving to next page
            },
            backClicked(currentPage) {
                console.log("back clicked", currentPage);
                return true; //return false if you want to prevent moving to previous page
            },
            cancelWorkflowCreation() {
                console.log('Cancel Workflow Creation');
                this.$emit('cancel-workflow-creation');
            },
            submitStep1() {
                console.log("going from general details to add integration steps:", this.config);
            }
        },
    };
</script>

<style>
    .addCalenNotifHeader {
        position: relative;
    }
    .notifTitle {
        
    }
    .cancelIcon {
        font-size: 20px;
        font-weight: 600;
        padding: 7px;
        border: 1px solid;
        border-radius: 50%;
        line-height: 11px;
        position: absolute;
        right: 10px;
        top: 0px;
    }
    .cancelIcon:hover {
        cursor: pointer;
    }

    .integrationTypesMainContainer {
        margin: 10px;
        padding: 10px;
        display: flex;
        flex-direction: row;
    }

    .integrationTypesMainContainer .integrationType {
        border: 1px solid #d9d9d9;
        flex: 1 1 auto;
        padding: 15px;
        margin: 15px;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .integrationTypesMainContainer .integrationType:hover {
        cursor: pointer;
    }

    .integrationTypesMainContainer .integrationType:hover:after {
        font-size: 65px;
        content: '+';
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        right: 0;
    }

    .integrationTypesMainContainer.roles .integrationType:hover:after {
        font-size: 50px;
    }

    .integrationTypesMainContainer .integrationTypeImage {
        height: 50px;
    }

    .nonSelectedList, .selectedList {
        width: 50%;
    }

</style>