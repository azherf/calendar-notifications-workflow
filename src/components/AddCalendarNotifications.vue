<template>
    <div>
        <vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked">
            <div slot="page0">
                <h4>Step 1</h4>
                <p>Add General Details</p>
            </div>
            <div slot="page2">
                <h4>Step 2</h4>
                <p>Add Inbound Integration</p>
            </div>
            <div slot="page3">
                <h4>Step 3</h4>
                <p>Select Roles and Templates</p>
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
export default {
    name: "demo",
    data() {
        return {
            steps: [
                {
                    label: "General Details",
                    slot: "page1",
                }, {
                    label: "Add Inbound Integration Types",
                    slot: "page2",
                }, {
                    label: "Select Roles and Templates",
                    slot: "page3",
                }, {
                    label: "Select Outbound Channels",
                    slot: "page4",
                }, {
                    label: "Summary",
                    slot: "page5",
                },
            ],
        };
    },
    methods: {
        nextClicked(currentPage) {
            console.log("next clicked", currentPage);
            return true; //return false if you want to prevent moving to next page
        },
        backClicked(currentPage) {
            console.log("back clicked", currentPage);
            return true; //return false if you want to prevent moving to previous page
        },
    },
};
</script>