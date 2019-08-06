<template>
  <v-container >
      <v-progress-circular
        :size="50"
        color="green"
        indeterminate
        v-if="!registro"
        ></v-progress-circular>
      <!-- <v-breadcrumbs divider=">" v-if="paciente">
          <v-breadcrumbs-item to="/dashboard"> 
              Inicio
          </v-breadcrumbs-item>
          <v-breadcrumbs-item disabled="">
              Paciente: {{paciente.apellidos}}, {{paciente.nombres}} (CI: {{paciente.identificacion}})
          </v-breadcrumbs-item>
      </v-breadcrumbs>    -->
      <v-layout  justify-center mt-2 v-if="registro">
        <v-flex xs12 md12 ma-1 transition="scale-transition">
          <v-toolbar dark color="green darken-3" >
              <v-btn icon :to="'/paciente/'+paciente.id">
                <v-icon>keyboard_backspace</v-icon>
              </v-btn>
              <v-toolbar-title> {{paciente.apellido_paterno}} {{paciente.apellido_materno}}, {{paciente.nombres}} (CI: {{paciente.identificacion}})</v-toolbar-title>
  
          </v-toolbar>
          <v-tabs
            color="green"
            dark
            slider-color="yellow"
            >
            <v-tab
                key=0        
                ripple
            >
                Detalle Registro 
            </v-tab>
            <v-tab-item
                key="0"
            >
                <v-card>
                    <v-card-text class="text-xs-center" >
                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <h3>HB1AC</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Valor Ultimo Hb1Ac:</span> {{ registro.reg_valor_hb1ac }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha Hb1Ac:</span> {{ formato(registro.reg_fecha_hb1ac) }}</h4>

                                <v-spacer></v-spacer>
                                <br>
                                <h3>Fondo de Ojo</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fondo de Ojo:</span> {{ registro.reg_fondo_ojo }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha:</span> {{ formato(registro.reg_fondo_ojo_fecha) }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Observaciones:</span> {{ registro.reg_fondo_ojo_observaciones }}</h4>
                                <br>
                                <h3>Datos Adicionales</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Glaucemias Capilares x Día:</span> {{ registro.reg_num_glaucemias_dia }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Presenta Lipodistrofia:</span> {{ registro.reg_lipodistrofia }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Presenta Lipohipertrofia:</span> {{ registro.reg_lipohipertrofia_zona }}</h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Presion Arterial:</span> {{ registro.reg_presion_arterial }}</h4>
                                <br>
                                <h3>GLUCAGON</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Dispone Glucagón:</span> {{ registro.reg_glucagon }}</h4>
                                <span class="caption" v-if="registro.reg_glucagon=='SI'">
                                      Entrega: {{ formato(registro.reg_glucagon_fecha_entrega) }}
                                </span>
                                <v-spacer></v-spacer>
                                <span class="caption" v-if="registro.reg_glucagon=='SI'">
                                      Vencimiento: {{ formato(registro.reg_glucagon_fecha_vencimiento) }}
                                </span>

                            </v-flex>
                            <v-flex xs12 sm4>
                                <h3>Controles</h3>
                                <v-divider></v-divider>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Control Psicológico:</span> {{ registro.reg_valoracion_psicologica }}
                                    <span class="caption" v-if="registro.reg_valoracion_psicologica=='SI'">
                                       ({{ formato(registro.reg_valoracion_psicologica_fecha) }})
                                    </span>
                                </h4>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Control Nutricional:</span> {{ registro.reg_control_nutricional }}
                                    <span class="caption" v-if="registro.reg_valoracion_psicologica=='SI'">
                                       ({{ formato(registro.reg_control_nutricional_fecha) }})
                                    </span>
                                </h4>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Control Médico:</span> {{ registro.reg_control_medico }}
                                    <span class="caption" v-if="registro.reg_control_medico=='SI'">
                                       ({{ formato(registro.reg_control_medico_fecha) }} {{registro.reg_control_medico_especialista}})
                                    </span>
                                </h4>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Control Podología:</span> {{ registro.reg_control_podologia }}
                                    <span class="caption" v-if="registro.reg_control_podologia=='SI'">
                                       ({{ formato(registro.reg_control_podologia_fecha) }})
                                    </span>
                                </h4>
                                <br>
                                <h3>Talleres</h3>
                                <v-divider></v-divider>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Taller de Educación:</span> {{ registro.reg_taller_educacion }}
                                    <span class="caption" v-if="registro.reg_taller_educacion=='SI'">
                                       ({{ formato(registro.reg_taller_educacion_fecha) }})
                                    </span>
                                </h4>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Taller de Nutrición:</span> {{ registro.reg_taller_nutricion }}
                                    <span class="caption" v-if="registro.reg_taller_nutricion=='SI'">
                                       ({{ formato(registro.reg_taller_nutricion_fecha) }})
                                    </span>
                                </h4>
                                <h4 class=""><span class="category font-weight-regular mb-3">Club de Diabetes:</span> {{ registro.reg_club_diabetes }}</h4>
                                <br>
                                <h3>Actividad Física</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Realiza Actividad:</span> {{ registro.reg_actividad_fisica }}</h4>
                                <h4 class="" v-if="registro.reg_actividad_fisica=='SI'"><span class="category font-weight-regular mb-3">Tipo Actividad:</span> {{ registro.reg_actividad_fisica_tipo }}</h4>
                                <h4 class="" v-if="registro.reg_actividad_fisica=='SI'"><span class="category font-weight-regular mb-3">Actividad:</span> {{ registro.reg_actividad_fisica_descripcion }}</h4>
                                <h4 class="" v-if="registro.reg_actividad_fisica=='SI'"><span class="category font-weight-regular mb-3">Duración:</span> {{ registro.reg_actividad_duracion }} horas/semana</h4>
                                
                            </v-flex>
                            
                            <v-flex xs12 sm4>
                                <h3>Datos Antropométricos</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Peso (Kg):</span> {{ registro.reg_peso }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Talla (cm):</span> {{ registro.reg_talla }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">IMC:</span> {{ registro.reg_imc }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Perímetro Abdominal:</span> {{ registro.reg_perimetro_abdominal }}</h4>  
                                <br>
                                <h3>Datos TANNER</h3>
                                <v-divider></v-divider>
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Tanner</span> {{ registro.reg_tanner }}
                                </h4>      
                                <h4 class="" v-if="registro.reg_tanner=='SI'">
                                    <span class="category font-weight-regular mb-3">FUM:</span> 
                                    {{ formato(registro.reg_fum) }}
                                </h4>
                                <h4 class="" v-if="registro.reg_tanner=='SI'">
                                    <span class="category font-weight-regular mb-3">Menarca:</span> 
                                    {{ registro.reg_menarca }}
                                </h4>
                                <br>
                                <h3>Observaciones</h3>
                                <v-divider></v-divider>
                                {{registro.reg_observaciones}}  
                            </v-flex>

                            <v-flex xs12 mt-3>
                                <h2>Perfil Analítico</h2>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Fecha último Perfil:</span> {{ formato(registro.reg_fecha_perfil_analitico) }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Número de Hipoglucemias por Semana:</span> {{ registro.reg_hipoglucemias_semana }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Número de Hiperglicemias por Semana:</span> {{ registro.reg_hiperglicemias_semana }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Hiperglucemias Prandiales:</span> {{ registro.reg_hiperglucemia_prandiales }}</h4>  
                                <h4 class=""><span class="category font-weight-regular mb-3">Hiperglucemias Postprandiales:</span> {{ registro.reg_hiperglucemia_postprandiales }}</h4>  
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Items Perfil:</span> 
                                    <v-chip outline color="success" v-bind:key="c.id" v-for="c in registro.reg_perfilanaliticos"> {{c.nombre}}</v-chip>
                                </h4> 
                                <h4 class="">
                                    <span class="category font-weight-regular mb-3">Complicaciones CIE10:</span> 
                                    <v-chip outline color="primary" v-bind:key="c.id" v-for="c in registro.reg_cie10s">{{c.codigo}}: {{c.descripcion}}</v-chip>
                                </h4>                                  
                            </v-flex>
  
                            <v-flex xs12 mt-4>
                                <h2>Esquema de Insulina</h2>
                                <v-divider></v-divider>

                                <template v-for="(item, index) in registro.esquemainsulinas">

                                    <v-divider
                                    :key="index"
                                    :inset="item.inset"
                                    ></v-divider>
                                    <div v-bind:key="item.id" > 
                                       <v-layout row wrap pa-3> 
                                        <v-flex xs6 >
                                            <h4>{{item.tipoinsulina.nombre}}</h4>  
                                            <span>{{item.tipoinsulina.tipo}} / {{item.tipoinsulina.tipo_reemplazo}}</span>
                                        </v-flex>   
                                        <v-flex xs6  v-if="item.tipoinsulina.tipo_reemplazo=='BOLO'">
                                            <v-chip outline color="primary">{{item.a1}}</v-chip>
                                            <v-chip outline color="primary">{{item.a2}}</v-chip>
                                            <v-chip outline color="primary">{{item.a3}}</v-chip>
                                        </v-flex> 
                                        <v-flex xs6  v-if="item.tipoinsulina.tipo_reemplazo=='BASAL'">
                                            AM: <v-chip outline color="green">{{item.am}}</v-chip>
                                            PM: <v-chip outline color="green">{{item.pm}}</v-chip>
                                        </v-flex> 
                                       </v-layout> 
                                    </div>        
                                   
                                </template>
                                                                
                            </v-flex>
                        </v-layout>   
                
                    </v-card-text>
                    
                </v-card>
            </v-tab-item>
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
                                <h4 class=""><span class="category font-weight-regular mb-3">Tutor legal/Padre/Madre:</span> {{ paciente.tutor }}</h4>
                                <v-spacer></v-spacer>
                                <br>
                                <h3>Médico Tratante</h3>
                                <v-divider></v-divider>
                                <h4 class=""><span class="category font-weight-regular mb-3">Médico Tratante:</span> {{ paciente.medico_cabecera }}</h4>
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
            
            
        </v-tabs>
          
        </v-flex>
        
      </v-layout>
   
  </v-container>
</template>

<script>

//import RegistroPaciente from "@/components/private/registros/RegistroPaciente"

import Strapi from 'strapi-sdk-javascript';
import moment from 'moment'
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data(){
    return {
      showForm:false,
      selectedObj:null,
      frmAction:"",
      loading:false,
      id:false,
      paciente:null,
      registro:null
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
              query: `
                query {
                    registro(id: ${this.id})  {
                        id
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
                        reg_control_medico_especialista
                        reg_taller_educacion
                        reg_taller_educacion_fecha
                        reg_taller_nutricion
                        reg_taller_nutricion_fecha
                        reg_club_diabetes
                        reg_control_podologia
                        reg_control_podologia_fecha
                        reg_actividad_fisica
                        reg_actividad_fisica_tipo
                        reg_actividad_fisica_descripcion
                        reg_actividad_duracion
                        reg_num_glaucemias_dia
                        reg_lipodistrofia
                        reg_controlado
                        reg_lipohipertrofia
                        reg_lipohipertrofia_zona
                        reg_glucagon
                        reg_glucagon_fecha_entrega
                        reg_glucagon_fecha_vencimiento
                        reg_peso
                        reg_talla
                        reg_imc
                        reg_perimetro_abdominal
                        eme_motivo
                        reg_tanner
                        reg_tanner_escala
                        reg_fum
                        reg_menarca
                        reg_fecha_perfil_analitico
                        reg_perfilanaliticos{
                            id
                            nombre
                        }
                        reg_hipoglucemias_semana
                        reg_hiperglicemias_semana
                        reg_hiperglucemia_prandiales
                        reg_hiperglucemia_postprandiales
                        reg_presion_arterial
                        reg_observaciones
                        kit_calibracion_glaucometro_fecha
                        kit_calibracion_glaucometro
                        kit_entrega_glucagon
                        reg_cie10s{
                            id
                            codigo
                            descripcion
                        }
                        esquemainsulinas{
                            id
                            tipoinsulina{
                            id
                            nombre
                            tipo
                            tipo_reemplazo
                            }
                            am
                            pm
                            a1
                            a2
                            a3
                        }
                        paciente{
                                id
                                nombres
                                apellido_paterno
                                apellido_materno
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

                            }
                        }
                    }
  

                            
                `
            }
        }).then(response=>{
            this.registro=response.data.registro;
            this.paciente=response.data.registro.paciente;
            this.loading=false;
        }).catch(error=>{
            this.loading=false;
        })
    },
    formato(fecha){
        return moment(String(fecha)).format('MMMM Do, YYYY')
    }
  },components:{
   
  }
}
</script>
