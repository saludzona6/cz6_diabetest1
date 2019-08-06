<template>
  <v-layout>
    
      <v-dialog v-model="show" scrollable fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="cancel">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title v-if="obj && action=='edit'" >Editar {{title}}</v-toolbar-title>
            <v-toolbar-title v-if="!obj" >Nuevo {{title}}</v-toolbar-title>
            <v-toolbar-title v-if="obj && action=='delete'" >Eliminar {{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn  dark small color="success" @click.native="save" v-if="(obj && action=='edit') || !obj ">
                <v-progress-circular
                  indeterminate
                  color="orange" this.loading = false;
                  v-show="loading"
                ></v-progress-circular>
                Guardar
              </v-btn>
              <v-btn  dark small color="warning" @click.native="deleteObj" v-if="obj && action=='delete'">
                <v-progress-circular
                  indeterminate
                  color="orange" this.loading = false;
                  v-show="loading"
                ></v-progress-circular>
                Eliminar
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text >
            <v-flex xs12 md8 offset-md2 >
              <v-card   >
                <v-card-title primary-title v-if="obj && action=='delete'" class="title">
                  <v-icon color="orange" large  >warning</v-icon> Está seguro que quiere eliminar {{description}} de forma permanente?
                </v-card-title>
                
                <v-card-text >
                    <h3>Datos Generales</h3>
                    <v-text-field
                      v-if="frmObj.establecimiento"
                      label="Establecimiento"
                      v-model="frmObj.establecimiento.nombre"
                      required
                      disabled=""
                    ></v-text-field>


                    <v-select
                    v-if="!frmObj.establecimiento"
                    :items="appData.establecimientos"
                    label="Escoja el Establecimiento de Salud"
                    v-model="frmObj.establecimiento"
                    return-object
                    item-text="nombre"
                  ></v-select>
                  
                  
                  <v-text-field
                    label="Nombres *"
                    v-model="frmObj.nombres"
                    required
                    @blur="$v.frmObj.nombres.$touch()"
                    :error-messages="nombresErrors"
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Apellido Paterno *"
                    v-model="frmObj.apellido_paterno"
                    required
                    @blur="$v.frmObj.apellido_paterno.$touch()"
                    :error-messages="apellidoPaternoErrors"
                    :disabled="action=='delete' || loading"
                  ></v-text-field>
                  
                    <v-text-field
                    label="Apellido Materno *"
                    v-model="frmObj.apellido_materno"
                    required
                    @blur="$v.frmObj.apellido_materno.$touch()"
                    :error-messages="apellidoMaternoErrors"
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Cedula / Pasaporte"
                    v-model="frmObj.identificacion"
                    required
                    @blur="$v.frmObj.identificacion.$touch()"
                    :error-messages="identificacionErrors"
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedFechaNacimientiFormatted"
                        label="Fecha de Nacimiento"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.fecha_nacimiento" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-select
                    :items="sexoItems"
                    label="Identidad Sexual"
                    v-model="frmObj.sexo"
                  ></v-select>

                  <v-select
                    :items="appData.provincias"
                    label="Provincia de Residencia"
                    v-model="frmObj.provincia_residencia"
                    return-object
                    item-text="nombre"
                  ></v-select>

                  <v-text-field
                    label="Ciudad de Residencia"
                    v-model="frmObj.ciudad_residencia"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Dirección"
                    v-model="frmObj.direccion"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Teléfono de Contacto"
                    v-model="frmObj.telefono"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Tutor legal/Padre/Madre"
                    v-model="frmObj.tutor"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-text >
                  <h3>Médico Tratante</h3>
                  <v-text-field
                    label="Nombre Médico Tratante"
                    v-model="frmObj.medico_cabecera"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="Contacto Médico Tratante (Celular)"
                    v-model="frmObj.contacto_medico_cabecera"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-text >
                  <h3>Información Debut</h3>
                  <v-text-field
                    label="Edad de Debut"
                    v-model="frmObj.edad_debut"
                    required
                    :disabled="action=='delete' || loading"
                    mask="##"
                    type="number"
                  ></v-text-field>

                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedFechaDebutFormatted"
                        label="Fecha de Debut"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" type="month" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-select
                    :items="appData.formadebuts"
                    label="Forma de Debut"
                    v-model="frmObj.forma_debut"
                    return-object
                    item-text="nombre"
                  ></v-select>

                  <v-text-field
                    v-if="frmObj.forma_debut && frmObj.forma_debut.nombre=='Otro'"
                    label="Descripción Forma Debut"
                    v-model="frmObj.forma_debut_desc"
                    required
                    :disabled="action=='delete' || loading"
                  ></v-text-field>

                  <v-text-field
                    label="% HB1AC (0-20)"
                    v-model="frmObj.hb1Ac_debut"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                  ></v-text-field>
                  </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-text >
                  <h3>Antecedentes Personales</h3>

                  <v-select
                    :items="complicacionItems"
                    label="Complicaciones"
                    v-model="frmObj.complicacionItems"
                  ></v-select>

                  <v-text-field
                    label="Número de Crisis"
                    v-model="frmObj.num_crisis"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                  ></v-text-field>

                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedFechaCrisis"
                        label="Fecha de ultima crisis"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.ultima_crisis" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-textarea
                    v-model="frmObj.comorbilidad"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Otras Comorbilidades"
                    rows="2"
                  ></v-textarea>

                  <v-textarea
                    v-model="frmObj.observaciones"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Observaciones"
                    rows="2"
                  ></v-textarea>

                </v-card-text>

                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                  v-show= "error"
                  

                >
                  Ha ocurrido un error grabar los cambios, por favor verifique los datos y que número de cédula no esté en uso, e intente nuevamante
                </v-alert>

              </v-card>
              <v-flex xs12 justify-center v-show="loading">
                <v-progress-linear
                  indeterminate
                  color="orange" this.dialog = false;
                ></v-progress-linear>
              </v-flex>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2500"
        top
        color="success"
        mt-5
        right
      >
        <v-icon>done</v-icon>
        <v-subheader v-if="obj && action=='edit'">{{description}} ha sido actualizado correctamente.</v-subheader>
        <v-subheader v-if="!obj">{{description}} ha sido creado con éxito!.</v-subheader>
        <v-subheader v-if="obj && action=='delete'">{{description}} ha sido eliminado.</v-subheader>
      </v-snackbar>
    </v-layout>
</template>
<script>
import axios from "axios"
import { validationMixin } from 'vuelidate'
import { required,  minLength, maxLength} from 'vuelidate/lib/validators'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

const OBJ= {
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  identificacion:"",
  establecimiento:null,
  fecha_nacimiento:new Date().toISOString().substr(0, 10),
  fecha_debut:new Date().toISOString().substr(0, 10),
  ciudad_residencia:""
}

export default {
  name: 'NuevoPacienteFrm',
  props: {
    obj: {
      type: Object,
      default: function () { return JSON.parse(JSON.stringify(OBJ)); }
    },
    show:{
      type:Boolean,
      default: function () {
        return false;
      }
    },
    action:{
      type:String,
      default: function () {
        return "edit";
      }
    }
  },
  data () {
    return {
      title:"Paciente",
      description:"El Paciente",
      hasSaved: false,
      loading: false,
      error:null,
      frmObj: {},
      date:null,
      sexoItems:["HOMBRE", "MUJER", "OTRO"]
    }
  },
  mixins: [validationMixin],
  validations: {
    frmObj:{
      nombres:{required},
      apellido_paterno:{required},
      apellido_materno:{required},
      identificacion:{required}
    }
  },
  watch:{
    obj: function(){
      if(!this.obj){
        this.frmObj=JSON.parse(JSON.stringify(OBJ));
        this.frmObj.establecimiento= this.profile.establecimiento
      }else{
        this.frmObj = JSON.parse(JSON.stringify(this.obj));
      }
    }
  },
  mounted(){
    if(!this.obj){
      this.frmObj=JSON.parse(JSON.stringify(OBJ));
      this.frmObj.establecimiento= this.profile.establecimiento
    }else{
      this.frmObj = JSON.parse(JSON.stringify(this.obj));
    }
  },
  methods:{
    clear() {
      this.loading=false;
      this.error=null;
      this.$v.$reset();
      this.frmObj=JSON.parse(JSON.stringify(OBJ));
    },
    save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }
      this.loading=true;
      this.error=null;
      if(this.obj){
        delete this.frmObj.user;
        delete this.frmObj.user_updated;
        delete this.frmObj.establecimiento;
        this.frmObj.user_updated=this.profile;
        strapi.updateEntry('pacientes', this.obj.id, this.frmObj ).then(response=>{
          this.hasSaved = true
          this.clear()
          this.$emit('frmClose')
        }).catch(error=>{
          this.hasSaved = false
          if(error ){
              this.error=error
          }
          return error;
        }).finally(() => this.loading = false)
      }else{
        delete this.frmObj.id;
        this.frmObj.user=this.profile;
        strapi.createEntry('pacientes', this.frmObj ).then(response=>{
          this.hasSaved = true
          this.clear()
          this.$emit('frmClose')
        }).catch(error=>{
          this.hasSaved = false
          if(error ){
              this.error=error
          }
          return error;
        }).finally(() => this.loading = false)
      }
    },
    deleteObj(){
      this.loading=true;
      this.error=null;
      if(this.obj){
        axios
        .delete('http://localhost:3000/api/PaymentTypes/'+this.obj.id)
        .then(response => {
          this.hasSaved = true
          this.clear()
          this.$emit('frmClose')
        })
        .catch(error => {
          this.hasSaved = false
          if(error && error.response && error.response.data){
              this.error=error.response.data.error
          }
          return error;
        }).finally(() => this.loading = false)
      }
    },
    cancel () {
      this.clear()
      this.$emit('frmClose')
    }
  },
  computed:{
    profile(){
      return this.$store.getters.getProfile
    },
    appData(){
      return this.$store.getters.getData
    },
    computedFechaNacimientiFormatted(){
      if(this.frmObj.fecha_nacimiento)
        return new Date(this.frmObj.fecha_nacimiento).toISOString().substr(0, 10)
      else
        return  new Date().toISOString().substr(0, 10)
    },
    computedFechaCrisis(){
      if(this.frmObj.fecha_crisis)
        return new Date(this.frmObj.fecha_nacimiento).toISOString().substr(0, 10)
      else
        return  new Date().toISOString().substr(0, 10)
    },
    computedFechaDebutFormatted(){
      if(this.frmObj.fecha_debut)
        return new Date(this.frmObj.fecha_debut).toISOString().substr(0, 7)
      else
        return new Date().toISOString().substr(0, 7)
    },
    nombresErrors () {
      const errors = []
      if (!this.$v.frmObj.nombres.$dirty)  return errors
      !this.$v.frmObj.nombres.required && errors.push('Nombres es requerido')
      return errors
    },
    apellidoPaternoErrors () {
      const errors = []
      if (!this.$v.frmObj.apellido_paterno.$dirty) return errors
      !this.$v.frmObj.apellido_paterno.required && errors.push('Apellido paterno es requerido')
      return errors
    },
    apellidoMaternoErrors () {
      const errors = []
      if (!this.$v.frmObj.apellido_materno.$dirty) return errors
      !this.$v.frmObj.apellido_materno.required && errors.push('Apellido materno es requerido')
      return errors
    },

    identificacionErrors () {
      const errors = []
      if (!this.$v.frmObj.identificacion.$dirty) return errors
      !this.$v.frmObj.identificacion.required && errors.push('Cédula o Documento de Identidad es requerido')
      return errors
    }

  }
}
</script>

<style scoped>

</style>
