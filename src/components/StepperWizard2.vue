<template>
  <div>
    <vue-good-wizard 
      ref="wizard"
      :steps="steps"
      :onNext="nextClicked" 
      :onBack="backClicked">
      <div slot="page1">
        <h4>Step 1</h4>
        <p>This is step 1</p>
      </div>
      <div slot="page2">
        <h4>Step 2</h4>
        <!-- lets say, this is where my form is that needs to be validated -->
        <el-form :model="myForm" ref="myForm">
        </el-form>
      </div>
      <div slot="page3">
        <h4>Step 3</h4>
        <p>This is step 3</p>
      </div>
    </vue-good-wizard>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data(){
    return {
      steps: [
        {
          label: 'Select Items',
          slot: 'page1',
        },
        {
          label: 'My form',
          slot: 'page2',
        },
        {
          label: 'Review',
          slot: 'page3',
        },
      ],
    };
  },
  methods: {
    nextClicked(currentPage) {
      const _this = this;

      // if we're on the form page
      if (currentPage == 1) {

        // on next, we need to validate the form
        _this.$refs.myForm.validate((valid) => {
          if (valid) {

            //all is good, lets proceed to next step
            _this.$refs.wizard.goNext(true);
          } else {

            //error. don't proceed.
            console.log('error submit!!');
            return false;
          }
        });
        return false; //don't proceed by default. 
      }
      return true; //return false if you want to prevent moving to next page
    },
    backClicked(currentPage) {
      console.log('back clicked', currentPage);
      return true; //return false if you want to prevent moving to previous page
    }
  },
};
</script>