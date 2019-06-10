<template>
  <div>
    <v-layout row class="text-xs-center">
      <v-flex xs12 md4 offset-md4 class="">
        <v-container style="position: relative;top: 1%;" class="text-xs-center light">
          <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" alt="" height="50px">
          <v-card flat>
            <v-card-title primary-title>
            </v-card-title>
            <v-form v-model="valid"  @submit.prevent="login">
            <v-text-field prepend-icon="email"
              label="Username / E-mail"
              :error-messages="identifierErrors"
              required
              @blur="$v.identifier.$touch()"
              v-model="identifier"  :disabled="loading" clearable></v-text-field>
            <v-text-field prepend-icon="lock"  label="Password" v-model="password" type="password" :disabled="loading"
              @blur="$v.password.$touch()"
              :error-messages="passErrors" clearable
            ></v-text-field>
            <v-card-actions>
              <v-btn type="submit" primary large block :disabled="loading" class="blue">
                <v-progress-circular
                  indeterminate
                  color="green"
                  v-show="loading"
                ></v-progress-circular>
                Login
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
            v-show="error"
          >
            Por favor verifique su dirección de correo y contraseña e intente nuevamente.
          </v-alert>
          
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import {AUTH_REQUEST} from '../../store/actions/auth'
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'login',
    data () {
      return {
        identifier: '',
        password: '',
        loading: false,
        valid: false,
        error:false
      }
    },
     mixins: [validationMixin],
    validations: {
      identifier: { required },
      password: { required, minLength: minLength(6) }
    },
    computed: {
      identifierErrors () {
        const errors = []
        if (!this.$v.identifier.$dirty) return errors
        !this.$v.identifier && errors.push('Ingrese una dirección de correo válida')
        !this.$v.identifier.required && errors.push('E-mail es requerido')
        return errors
      },passErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('La contraseña debe tener al menos 6 caracteres')
        return errors
      }
    },
    methods: {
      login: function () {
          this.$v.$touch()
          if (this.$v.$invalid) {
            return;
          }
          this.loading=true;
          const { identifier, password } = this
          this.$store.dispatch(AUTH_REQUEST, { identifier, password }).then(() => {
            this.$router.push('/dashboard')
          }).catch(err => {
            if( err.message != 'Network Error'){
              this.error=err
            }
          }).finally(() => this.loading = false)
      }
    },
  }
</script>
<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>
