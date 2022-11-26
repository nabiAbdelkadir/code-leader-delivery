<template>
  <el-form ref="form" :model="rForm" label-width="100px">

    <!-- name -->
    <el-form-item label="Name" :vuelidate="$v.rForm.name" :vuelidate-messages="messages.rForm.name">
      <el-input v-model.trim="rForm.name"     placeholder="Your first name" @input="$v.rForm.name.$touch()" />
    </el-form-item>

    <!-- last name -->
    <el-form-item label="Last Name" :vuelidate="$v.rForm.lastName" :vuelidate-messages="messages.rForm.lastName">
      <el-input v-model.trim="rForm.lastName" placeholder="Your last name"  @input="$v.rForm.lastName.$touch()" />
    </el-form-item>

    <!-- email -->
    <el-form-item label="Email" :vuelidate="$v.rForm.email" :vuelidate-messages="messages.rForm.email">
      <el-input v-model.trim="rForm.email"    placeholder="Your email"      @input="$v.rForm.email.$touch()"/>
    </el-form-item>

    <!-- username -->
    <el-form-item label="Username" :vuelidate="$v.rForm.username" :vuelidate-messages="messages.rForm.username">
      <el-input v-model.trim="rForm.username" placeholder="Your username"   @input="$v.rForm.username.$touch()"/>
    </el-form-item>

    <!-- $each example -->
    <el-form-item v-for="(person, index) in people" :key="index" :label="'Name ' + index" :vuelidate="$v.people.$each[index].name" :vuelidate-messages="messages.$each.name">
      <el-input v-model.trim="person.name" :placeholder="'input n' + index" @input="$v.people.$each[index].$touch()"/>
    </el-form-item>
    <el-button @click="people.push({name: ''})">Add</el-button>
    <el-button @click="people.pop()">Remove</el-button>

    <!-- password -->
    <el-form-item label="Password" :vuelidate="$v.rForm.password" :vuelidate-messages="messages.rForm.password">
      <el-input v-model.trim="rForm.password" placeholder="Your password"   @input="$v.rForm.password.$touch()" type="password"/>
    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click.prevent="onSubmit()" :disabled="$v.$invalid || $v.pending">Register</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { required, minLength, maxLength, email, alpha, alphaNum } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      people: [{
        name: "John",
      }, {
        name: "",
      }],
      messages: {
        $each: {
          name: {
            required: "Name is required.",
            minLength: "Name must have at least",
          },
        },
        rForm: {
          name: {
            required: "Your name is required.",
            alpha: "Your name is invalid, you must only use letters.",
          },
          lastName: {
            required: "Your last name is required.",
            alpha: "Your last name is invalid, you must only use letters or numbers.",
          },
          email: {
            required: "Your email is required.",
            exists: "This email is already registered.",
            email: "Your email is invalid.",
          },
          username: {
            minLength: "There is a minimum length requirement of 3.",
            required: "Your username is required.",
            alphaNum: "Your username is invalid.",
            exists: "This username is already registered.",
          },
          password: {
            minLength: "There is a minimum length requirement of 6.",
            required: "Your password is required.",
          },
        },
      },
      rForm: {
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
    };
  },
  validations: {
    rForm: {
      name: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      lastName: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      username: {
        alphaNum,
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
        exists(value) {
          return this.checkExists(value, "username");
        },
      },
      email: {
        email,
        required,
        minLength: minLength(4),
        maxLength: maxLength(255),
        exists(value) {
          return this.checkExists(value, "email");
        },
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
    },
  },
  methods: {
    checkExists(value, field) {
      if (value === "") {
        return true;
      }
      this.loading = true;
      const exists = {
        [field]: value,
      };
      // your http...
    },
    onSubmit() {
      if (this.$v.$invalid === true) {
        return;
      }
      const user = {
        lastName: this.rForm.lastName,
        password: this.rForm.password,
        username: this.rForm.username,
        email: this.rForm.email,
        name: this.rForm.name,
      };
      // your http...
    },
  },
};
</script>
