<template>
  <v-container >
      <v-progress-circular
        v-if="!paciente"
        :size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
      <!-- <v-breadcrumbs divider=">" v-if="paciente">
          <v-breadcrumbs-item to="/dashboard"> 
              Inicio
          </v-breadcrumbs-item>
          <v-breadcrumbs-item disabled="">
              Paciente: {{paciente.apellidos}}, {{paciente.nombres}} (CI: {{paciente.identificacion}})
          </v-breadcrumbs-item>
      </v-breadcrumbs>    -->
      <v-layout  justify-center mt-2 v-if="paciente">
        <v-flex xs12 md12 ma-1 transition="scale-transition">
          <v-toolbar dark color="cyan darken-3" >
              <v-btn icon to="/dashboard">
                <v-icon>keyboard_backspace</v-icon>
              </v-btn>
              <v-toolbar-title> {{paciente.apellidos}}, {{paciente.nombres}} (CI: {{paciente.identificacion}})</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="editPaciente(paciente)">
                <v-icon>edit</v-icon>
              </v-btn>
             
          </v-toolbar>
          <v-tabs
            color="cyan"
            dark
            slider-color="yellow"
            >
            <v-tab
                key=1        
                ripple
            >
                Datos Paciente
            </v-tab>
            <v-tab-item
                key="1"
            >
                <v-card>
                    <v-card-text class="text-xs-center" >
                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <h3>Datos Generales</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha Nacimiento:</span> {{ computedFechaNacimientiFormatted }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Sexo:</span> {{ paciente.sexo }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Residencia:</span>  {{ paciente.provincia_residencia.nombre }} / {{paciente.ciudad_residencia}}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Dirección:</span> {{ paciente.direccion }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Teléfono Contacto:</span> {{ paciente.telefono }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Tutor:</span> {{ paciente.tutor }}</h4>
                                <v-spacer></v-spacer>
                                <br>
                                <h3>Médico de Cabecera</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Médico Cabecera:</span> {{ paciente.medico_cabecera }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Contacto:</span> {{ paciente.contacto_medico_cabecera }}</h4>

                            </v-flex>
                            <v-flex xs12 sm4>
                                <h3>Datos Debut</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Edad Debut:</span> {{ paciente.edad_debut }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha Debut:</span> {{ computedFechaDebutFormatted }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Forma Debut:</span> {{ paciente.forma_debut.nombre }}</h4>
                                <h4 class="" v-if="paciente.forma_debut && paciente.forma_debut.nombre=='Otro'"><span class="category font-weight-regular mb-3">Descripcion Debut:</span> {{ paciente.forma_debut_desc }}</h4>    
                                
                                <h4 class=""><span class="category font-weight-regular mb-3">HB1AC Debut:</span> {{ paciente.hb1Ac_debut }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Años con DMT1:</span> </h4>
                            </v-flex>
                            <v-flex xs12 sm4>
                                <h3>Datos Adicionales</h3>
                                <v-divider></v-divider>
                                <h4 class="font-weight-regular" >
                                    <span class="category font-weight-light">Comorbilidad:</span> 
                                    <v-spacer></v-spacer>
                                    {{ paciente.comorbilidad }}</h4>
                                <br>
                                <v-divider></v-divider>
                                <h4 class="font-weight-regular">
                                    <span class="category font-weight-light">Complicaciones:</span> 
                                    <v-spacer></v-spacer>
                                    {{ paciente.complicaciones }}
                                </h4>
                                <br>
                                <v-divider></v-divider>
                                <h4 class="font-weight-regular" >
                                    <span class="category font-weight-light">Observaciones:</span> 
                                    <v-spacer></v-spacer>
                                    {{ paciente.observaciones }}
                                </h4>
                            </v-flex>
        
                        </v-layout>   
                
                    </v-card-text>
                    
                </v-card>
            </v-tab-item>
                <v-tab
                key=2        
                ripple
            >
                Historial 
            </v-tab>
            <v-tab-item
                key="2"
            >
                <v-card>
                    <v-card-text class="text-xs-center" >
                        <v-layout row wrap>
                            <v-flex xs12 sm12>
                                <v-divider></v-divider>
                                <h4 class="" v-if="paciente.user"><span class="category font-weight-regular mb-3" >Creado por:</span> {{ paciente.user.username }}</h4>
                                <v-divider></v-divider>
                                <h4 class="" v-if="paciente.user && paciente.user.establecimiento && paciente.user.establecimiento.nombre"><span class="category font-weight-regular mb-3" >Establecimiento:</span> {{ paciente.user.establecimiento.nombre }}</h4>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha Creación:</span> {{ paciente.created_at }}</h4>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha Modificación:</span> {{ paciente.updated_at }}</h4>
                                <v-divider></v-divider>
                                <h4 class=""  v-if="paciente.user_updated"><span class="category font-weight-regular mb-3" >Modificado por:</span> {{ paciente.user_updated.username }}</h4>
                                <v-divider></v-divider>
                                <h4 class="" v-if="paciente.user_updated && paciente.user_updated.establecimiento && paciente.user_updated.establecimiento.nombre" ><span class="category font-weight-regular mb-3" >Establecimiento Modificación:</span> {{ paciente.user_updated.establecimiento.nombre }}</h4>
                                
                            </v-flex>
                        </v-layout>   
                
                    </v-card-text>
                    
                </v-card>
            </v-tab-item>
        </v-tabs>
          <RegistroPaciente v-bind:paciente="paciente" v-on:reload="initalize()"></RegistroPaciente>
        </v-flex>
        
        
      </v-layout>
      



    <NuevoPacienteFrm v-bind:show="showForm" v-bind:obj="selectedObj" @frmClose="closeFormPaciente" v-bind:action="frmAction" ></NuevoPacienteFrm>
  </v-container>
</template>

<script>

import RegistroPaciente from "@/components/private/registros/RegistroPaciente"
import NuevoPacienteFrm from "@/components/private/NuevoPaciente/NuevoPacienteFrm"
import Strapi from 'strapi-sdk-javascript';
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data(){
    return {
      showForm:false,
      selectedObj:null,
      frmAction:"",
      loading:false,
      id:false,
      paciente:null
    }
  },
  created() {
    this.id = this.$route.params.id;

  },
  mounted(){
      this.initalize();
  },
  computed:{
    profile(){
        return this.$store.getters.getProfile
    },
    computedFechaNacimientiFormatted(){
      if(this.paciente.fecha_nacimiento)
        return new Date(this.paciente.fecha_nacimiento).toISOString().substr(0, 10)
      else
        return  new Date().toISOString().substr(0, 10)
    },
    computedFechaDebutFormatted(){
      if(this.paciente.fecha_debut)
        return new Date(this.paciente.fecha_debut).toISOString().substr(0, 10)
      else
        return  new Date().toISOString().substr(0, 10)
    },
  },
  methods: {
    editPaciente(vObj){
        this.selectedObj=vObj;
        this.frmAction="edit";
        this.showForm=true;
    },
    closeFormPaciente(){
        this.selectedObj={};
        this.showForm=false;
        this.initalize();
    },
    initalize(){
            strapi.request('post', '/graphql', {
            data: {
              query: `query {
                            paciente(id: ${this.id})  {
                                id
                                nombres
                                apellidos
                                establecimiento{
                                    id
                                    nombre
                                }
                                identificacion
                                fecha_nacimiento
                                sexo
                                provincia_residencia{
                                    id
                                    nombre
                                }
                                ciudad_residencia
                                edad_debut
                                fecha_debut
                                forma_debut{
                                    id
                                    nombre
                                }
                                hb1Ac_debut
                                medico_cabecera
                                contacto_medico_cabecera
                                direccion
                                telefono
                                tutor
                                comorbilidad
                                complicaciones
                                observaciones
                                forma_debut_desc
                                user{
                                    username
                                    establecimiento{
                                        nombre
                                    }
                                }
                                created_at
                                updated_at
                                user_updated{
                                    username
                                    establecimiento{
                                        nombre
                                    }
                                }
                                registros{
                                    created_at
                                    id
                                    tipo
                                    kit_fecha
                                    kit_tirillas
                                    kit_fecha_caducidad_glaucon
                                    reg_valor_hb1ac
                                    reg_fecha_hb1ac
                                    reg_fondo_ojo
                                    reg_fondo_ojo_fecha
                                    reg_fondo_ojo_observaciones
                                    reg_valoracion_psicologica
                                    reg_valoracion_psicologica_fecha
                                    reg_control_nutricional
                                    reg_control_nutricional_fecha
                                    reg_control_medico
                                    reg_control_medico_fecha
                                    reg_taller_educacion
                                    reg_taller_educacion_fecha
                                    reg_taller_nutricion
                                    reg_taller_nutricion_fecha
                                    reg_control_podologia
                                    reg_control_podologia_fecha
                                    reg_actividad_fisica
                                    reg_actividad_fisica_tipo
                                    reg_actividad_fisica_descripcion
                                    reg_actividad_duracion
                                    reg_num_glaucemias_dia
                                    reg_lipodistrofia
                                    reg_glucagon
                                    reg_glucagon_fecha_entrega
                                    reg_glucagon_fecha_vencimiento
                                    reg_peso
                                    reg_talla
                                    reg_imc
                                    reg_perimetro_abdominal
                                    reg_tanner
                                    reg_fum
                                    reg_menarca
                                    reg_perfilanaliticos{
                                        id
                                        nombre
                                    }
                                    reg_hipoglucemias_semana
                                    reg_observaciones
                                    kit_calibracion_glaucometro_fecha
                                    kit_calibracion_glaucometro
                                    kit_entrega_glucagon
                                    reg_cie10s{
                                        id
                                        codigo
                                        descripcion
                                    }
                                }
                            }
                        }
                `
            }
        }).then(response=>{
            this.paciente=response.data.paciente;
            this.loading=false;
        }).catch(error=>{
            this.loading=false;
        })
    }
  },components:{
    RegistroPaciente,
    NuevoPacienteFrm
  }
}
</script>
