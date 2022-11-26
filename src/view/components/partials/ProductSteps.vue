<template>
    <div class="wizard-steps">
      <div
          class="wizard-step"
          data-wizard-type="step"
          data-wizard-state="current"
      >
        <div class="wizard-wrapper">
          <div class="wizard-icon">
                  <span class="svg-icon svg-icon-2x">
                    <inline-svg src="media/svg/icons/General/User.svg"/>
                  </span>
          </div>
          <div class="wizard-label">
            <h3 class="wizard-title">
              Account Settings
            </h3>
            <div class="wizard-desc">
              Setup Your Account Details
            </div>
          </div>
        </div>
      </div>

      <div class="wizard-step" data-wizard-type="step">
        <div class="wizard-wrapper">
          <div class="wizard-icon">
                  <span class="svg-icon svg-icon-2x">
                    <inline-svg src="media/svg/icons/Map/Compass.svg"/>
                  </span>
          </div>
          <div class="wizard-label">
            <h3 class="wizard-title">
              Setup Locations
            </h3>
            <div class="wizard-desc">
              Choose Your Location Map
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'product-steps'
}
</script>