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
                            <div class="nameField form-group" :class="{ 'form-group--error': $v.config.generalDetails.wfName.value.$error }">
                                <div class="labelDiv">
                                    <label for="wf-name" class="wf-label">{{config.generalDetails.wfName.label}}</label>
                                </div>
                                <div class="inputDiv">
                                    <input type="text" id="wf-name" name="wf-name" v-model.lazy.trim="$v.config.generalDetails.wfName.value.$model" class="wf-input"> 
                                </div>
                            </div>
                            <div class="fieldError" v-if="!$v.config.generalDetails.wfName.value.required">Field is required</div>
                            <div class="fieldError" v-if="!$v.config.generalDetails.wfName.value.minLength">Name must have at least {{$v.config.generalDetails.wfName.value.$params.minLength.min}} letters.</div>
                            <div class="DescriptionField form-group" :class="{ 'form-group--error': $v.config.generalDetails.wfDescription.value.$error }">
                                <div class="labelDiv">
                                    <label for="wf-description" class="wf-label">{{config.generalDetails.wfDescription.label}}</label>
                                </div>
                                <div class="inputDiv">
                                    <textarea id="wf-description" name="wf-description" rows="10" v-model.lazy.trim="$v.config.generalDetails.wfDescription.value.$model" class="wf-textarea"></textarea>
                                </div>
                            </div>
                            <div class="fieldError" v-if="!$v.config.generalDetails.wfDescription.value.required">Field is required</div>
                        </form>
                    </div>
                </template>
            </div>
            <div slot="page2">
                <template>
                    <div class="integrationTypesMainContainer">
                        <div class="nonSelectedList">
                            <h4 class="itemsTitle">Select Integration Types</h4>
                            <div class="integrationType" v-for="itype in IntegrationTypes" :key="itype.id" @click="addIntegrationType(itype.id)">
                                <img class="integrationTypeImage" :src="require('../' + itype.image)" :alt="itype.name">
                                {{itype.name}}
                            </div>    
                        </div>
                        <div class="selectedList">
                            <h4 class="itemsTitle">Selected Integration Types</h4>
                            <div class="integrationType" v-for="itype in config.integrationTypes" :key="itype.id">
                                <img class="integrationTypeImage" :src="require('../' + itype.image)" :alt="itype.name">
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
                            <h4 class="itemsTitle">Select Roles</h4>
                            <div class="integrationType" v-for="role in Roles" :key="role.id" @click="addRole(role.id)">
                                {{role.name}}
                            </div>    
                        </div>
                        <div class="selectedList">
                            <h4 class="itemsTitle">Selected Roles and Templates</h4>
                            <div class="selectedRole" v-for="role in config.rolesAndTemplates" :key="role.id">
                                <div class="integrationType">
                                    {{role.name}}
                                </div>    
                                <div class="markdownTemplate" @click="openRoleTemplatesPanel">
                                    Template
                                </div>
                            </div>
                        </div>
                    </div>
                    <slide-out dock="right" target="#wizard__body__step" resizable :visible.sync="visible" title="Markdown template">
                        <form @submit.prevent="saveTemplate">
                            <div class="nameField">
                                <div class="labelDiv">
                                    <label for="wf-name" class="wf-label">Subject</label>
                                </div>
                                <div class="inputDiv">
                                    <input type="text" id="wf-name" name="wf-name" v-model.lazy.trim="subject" class="wf-input"> 
                                </div>
                            </div>
                            <div class="DescriptionField">
                                <div class="labelDiv">
                                    <label for="wf-description" class="wf-label">Content</label>
                                </div>
                                <div class="inputDiv">
                                    <textarea id="wf-description" name="wf-description" rows="10" v-model.lazy.trim="content" class="wf-textarea"></textarea>
                                </div>
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </slide-out>
                </template>
            </div>
            <div slot="page4">
                <template>
                    <div class="integrationTypesMainContainer">
                        <div class="nonSelectedList">
                            <h4 class="itemsTitle">Select Outbound Channels</h4>
                            <div class="integrationType" v-for="channel in OutboundChannels" :key="channel.id" @click="addOutboundChannel(channel.id)">
                                <img class="integrationTypeImage" :src="require('../' + channel.image)" :alt="channel.name">
                                {{channel.name}}
                            </div>    
                        </div>
                        <div class="selectedList">
                            <h4 class="itemsTitle">Selected Outbound Channels</h4>
                            <div class="integrationType" v-for="channel in config.outboundChannels" :key="channel.id">
                                <img class="integrationTypeImage" :src="require('../' + channel.image)" :alt="channel.name">
                                {{channel.name}}
                            </div>    
                        </div>
                    </div>
                </template>
            </div>
            <div slot="page5">
                <template>
                    <div class="summaryMainContainer">
                        <div class="stage" v-for="(stage, stageId) in summary" :key="stageId">
                            <div class="stageTitle">
                                {{stage["summaryLabel"]}}
                            </div>
                            <div class="stageDetails">
                                <div v-if="stage['isArray']">
                                    <!-- Array: {{stage['isArray']}} -->
                                    <ul>
                                       <li v-for="item in stage.data" :key="item.id">
                                            <img v-if="item.image !== undefined" :src="require('../' + item.image)" :alt="item.name" />
                                            <span>{{item.name}}</span>   
                                        </li> 
                                    </ul>
                                </div>
                                <div v-else>
                                    <!-- Non-Array: {{stage['isArray']}} -->
                                    <div class="fieldDetail" v-for="(field, fieldId) in stage.data" :key="fieldId">
                                        <span class="label">{{field['label']}}:</span>
                                        <span class="value">{{field['value']}}</span>
                                    </div>
                                    <!-- {{value['data']}} -->
                                    <!-- stagId: {{stageId}} -->
                                </div>
                            </div>
                        </div>
                    </div>    
                </template>
            </div>
        </vue-good-wizard>
    </div>
</template>

<script>
    // import GeneralDetails from './GeneralDetails.vue';
    // import HelloWorld from './HelloWorld.vue';
    import uniqueId from 'lodash.uniqueid';

    // import Slideout from '@hyjiacan/vue-slideout'
    import '@hyjiacan/vue-slideout/lib/slideout.css';

    import { required, minLength } from 'vuelidate/lib/validators';

    export default {
        name: "calendar-notifications",
        components: {
            // Slideout
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
                visible: false,
                steps: [
                    {
                        id: "generalDetails",
                        label: "General Details",
                        slot: "page1",
                        summaryLabel: "General Details",
                    }, {
                        id: "integrationTypes",
                        label: "Add Inbound Integration Types",
                        slot: "page2",
                        summaryLabel: "Integration Types",
                    }, {
                        id: "rolesAndTemplates",
                        label: "Select Roles and Templates",
                        slot: "page3",
                        summaryLabel: "Roles and Templates"
                    }, {
                        id: "outboundChannels",
                        label: "Select Outbound Channels",
                        slot: "page4",
                        summaryLabel: "Outbound Channels",
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
                        wfName: {
                            label: "Name",
                            value: ""
                        },
                        wfDescription: {
                            label: "Description",
                            value: ""
                        }
                    },
                    integrationTypes: [],
                    rolesAndTemplates: [],
                    outboundChannels: []
                },
                subject: "",
                content: ""
            };
        },
        validations: {
            config: {
                generalDetails: {
                    wfName: {
                        label: "Name",
                        value: {
                            required,
                            minLength: minLength(4)
                        }
                    },
                    wfDescription: {
                        label: "Description",
                        value: {
                            required
                        }
                    }
                }
            },
        },
        computed: {
            summary: function() {
                console.log("Inside computed property");
                let summary = {};
                Object.keys(this.config).forEach(item => {
                    summary[item] = {};
                    const configItem = this.config[item];
                    const step = this.steps.find(s => s.id === item);
                    summary[item].summaryLabel = step.summaryLabel;
                    summary[item].data = configItem;
                    summary[item].isArray = Array.isArray(configItem);
                });                
                return summary;
            }
        },
        methods: {
            nextClicked(currentPage) {
                console.log("next clicked", currentPage);
                let errorCount = 0;
                switch(currentPage) {
                    case 0:
                        //Run validations here
                        this.$v.$touch();
                        if(this.$v.$anyError) {
                            errorCount++;
                        }
                        break;
                    case 1:
                        //Run validations here
                        break;
                    case 2:
                        //Run validations here
                        break;
                        //Run validations here
                    case 3:
                        console.log('This is summary page');
                        this.buildSummary();
                        break;
                    case 4:
                        break;
                }                
                return errorCount === 0; //return false if you want to prevent moving to next page
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
            },
            addIntegrationType(itypeId) {
                const itypeIndex = this.IntegrationTypes.findIndex(item => item.id === itypeId);
                if(itypeIndex >= 0) {
                    this.config.integrationTypes.push(this.IntegrationTypes[itypeIndex]);
                    this.IntegrationTypes.splice(itypeIndex, 1);
                }
            },
            addRole(roleId) {
                const itypeIndex = this.Roles.findIndex(item => item.id === roleId);
                if(itypeIndex >= 0) {
                    this.config.rolesAndTemplates.push(this.Roles[itypeIndex]);
                    this.Roles.splice(itypeIndex, 1);
                }
            },
            addOutboundChannel(channelId) {
                const itypeIndex = this.OutboundChannels.findIndex(item => item.id === channelId);
                if(itypeIndex >= 0) {
                    this.config.outboundChannels.push(this.OutboundChannels[itypeIndex]);
                    this.OutboundChannels.splice(itypeIndex, 1);
                }
            },
            buildSummary() {
                console.log(this.config);
                Object.keys(this.config).forEach(item => {
                    this.summary[item] = {};
                    const configItem = this.config[item];
                    const step = this.steps.find(s => s.id === item);
                    this.summary[item].summaryLabel = step.summaryLabel;
                    this.summary[item].data = configItem;
                    this.summary[item].isArray = Array.isArray(configItem);
                });
                console.log(this.summary);
                /**
                 * summary: {
                 *      
                 * }
                 */
            },
            onClosing (e) {
                // prevent close and wait
                e.pause = true
                // close after 3 seconds
                setTimeout(() => {
                    // assign true to close, do nothing or assign false to cancel close.
                    e.resume = true
                }, 3000)
            },
            openRoleTemplatesPanel() {
                this.visible = true;
            },
            saveTemplate() {
                console.log("Saving template");
            }
        },
    };
</script>

<style>
    .addCalenNotifHeader {
        position: relative;
        margin-bottom: 30px;
    }
    .notifTitle {
        text-align: left;
        padding-left: 20px;
    }
    .cancelIcon {
        font-size: 20px;
        font-weight: 600;
        padding: 7px;
        border: 1px solid;
        border-radius: 50%;
        line-height: 11px;
        position: absolute;
        right: 20px;
        top: 0px;
    }
    .cancelIcon:hover {
        cursor: pointer;
    }

    .generalDetailsMainContainer {
        margin: 0 20%;
        display: flex;
        color: #9e9e9e;
    }

    .vue-slideout-content {
        margin: 0 10%;
        display: flex;
        color: #9e9e9e;
    }

    .generalDetailsMainContainer form {
        width: 100%;
    }

    .vue-slideout-content form {
        width: 90%;
    }

    .generalDetailsMainContainer form .nameField,
    .vue-slideout-content form .nameField {
        margin: 10px 0 20px;
    }

    .generalDetailsMainContainer form .labelDiv,
    .vue-slideout-content form .labelDiv {
        text-align: left;
        padding: 5px 0 10px;
    }

    .generalDetailsMainContainer form input,
    .vue-slideout-content form input,
    .generalDetailsMainContainer form textarea,
    .vue-slideout-content form textarea {
        width: 100%;
        padding: 10px 0 10px 10px;
        color: #383838;
        border-radius: 4px;
        border: 1px solid #9e9e9e;
    }

    .generalDetailsMainContainer form input {
        
    }

    .generalDetailsMainContainer form textarea,
    .vue-slideout-content form textarea {
        font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI emoji;
    }

    .generalDetailsMainContainer form input:focus,
    .generalDetailsMainContainer form textarea:focus,
    .vue-slideout-content form input:focus,
    .vue-slideout-content form textarea:focus {
        outline: none !important;
        border-color: #51abe4;
        box-shadow: 0 0 10px #51abe4;
    }

    .form-group--error input,
    .form-group--error textarea {
        border: 1px solid #ff6565 !important;
    }

    .fieldError {
        color: #ff6565;
    }

    .integrationTypesMainContainer {
        margin: 10px;
        padding: 10px;
        display: flex;
        flex-direction: row;
    }

    .integrationType {
        border: 1px solid #d9d9d9;
        flex: 1 1 auto;
        padding: 15px;
        margin: 15px;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        background: #f1f1f1;
        border-radius: 5px;
    }

    .integrationType:hover {
        cursor: pointer;
    }

    .integrationType:hover:after {
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

    .selectedList .integrationType:hover:after {
        content: '-';
        color: #ff6565;
    }


    .roles .integrationType:hover:after {
        font-size: 50px;
    }

     .integrationTypeImage {
        height: 50px;
    }

    .nonSelectedList, .selectedList {
        width: 50%;
        padding: 20px;
    }

    .nonSelectedList {
        border-right: 1px solid #aebac4;
    }

    .stageDetails img {
        height: 22px;
        margin-bottom: -5px;
    }

    .summaryMainContainer {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 25px;
    }

    .summaryMainContainer .stage {
        height: 170px;
        margin: 10px 10px 10px 2%;
        width: 45%;
    }

    .stageTitle {
        padding: 10px;
        background: #c4c4c4;
        text-align-last: left;
    }

    .stageDetails {
        padding: 10px;
        overflow: auto;
        height: calc(100% - 50px);
    }

    .stageDetails .label {
        width: calc(30% - 10px);
        display: inline-block;
        color: #9e9e9e;
        text-align: right;
        padding-right: 10px;
        vertical-align: top;
    }

    .stageDetails .value {
        width: 70%;
        display: inline-block;
        text-align: left;
    }

    .stageDetails ul {
        list-style: none;
    }

    .stageDetails ul li::before {
        content: "\2022";
        color: #c4c4c4;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }

    .stageDetails li {
        text-align: left;
        padding: 5px;
    }

    .stageDetails .fieldDetail {
        padding: 5px;
    }

</style>