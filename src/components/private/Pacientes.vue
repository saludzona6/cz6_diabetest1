<template>
    <v-container >
        <v-card-title>
      Pacientes:
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line

      ></v-text-field>
    </v-card-title>
     <v-layout row wrap class="dark--text">
      <v-flex xs12 sm6>
          <v-btn  @click="editPaciente(null)">Nuevo Paciente <v-icon right dark>folder_shared</v-icon></v-btn>
      </v-flex>
      <v-flex xs12 sm6>
        <v-switch
            v-model="miEstablecimiento"
            label="Ver solo mis pacientes"
            color="blue"
            @change="initialize"
        ></v-switch>
      </v-flex>
    </v-layout>
    
    <v-badge
          color="cyan"
          left
          overlap
        >
        <template v-slot:badge>
            <span>{{items.length}}</span> registros
          </template>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        class="elevation-1"
        :rows-per-page-items="rowsConf"
    >
        <template slot="items" slot-scope="props">
            <td>
                <v-btn  @click="paciente(props.item.id)">{{ props.item.apellido_paterno }}, {{ props.item.apellido_materno }}, {{ props.item.nombres }}</v-btn>
                
            </td>
            <td class="text-xs-right">{{ props.item.identificacion }}</td>
            <td class="text-xs-right" ><span v-if="props.item.provincia_residencia">{{ props.item.provincia_residencia.nombre }} / </span>{{ props.item.ciudad_residencia }}</td>
            <td class="text-xs-right">{{ props.item.sexo }}</td>
            <td class="text-xs-right"><span v-if="props.item.establecimiento">{{ props.item.establecimiento.nombre }} </span></td>
            <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editPaciente(props.item)">
                    <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                </v-btn>
            </td>
        </template>
    
    </v-data-table>
    </v-badge>
    <NuevoPacienteFrm v-bind:show="showForm" v-bind:obj="selectedObj" @frmClose="closeFormPaciente" v-bind:action="frmAction" ></NuevoPacienteFrm>
 </v-container>       
</template>

<script>
    import Strapi from 'strapi-sdk-javascript';
    import NuevoPacienteFrm from "@/components/private/NuevoPaciente/NuevoPacienteFrm"
import { setTimeout } from 'timers';
    const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'
    const strapi = new Strapi(apiUrl)
    export default {
        data: () => ({
            showForm:false,
            selectedObj:null,
            frmAction:"",
            loading:false,
            search:"",
            miEstablecimiento:true,
            rowsConf:[10,20,30,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
            headers: [
                {
                    text: 'Paciente',
                    align: 'left',
                    value: 'apellido_paterno' 
                },
                { text: 'Cedula', value: 'identificacion' },
                { text: 'Ciudad', value: 'ciudad_residencia' },
                { text: 'Sexo', value: 'sexo' },
                { text: 'Establecimiento', value: 'establecimiento.nombre' },
                { text: 'Actions', value: 'name', sortable: false }
            ],
            items: []
        }),

        computed: {
            profile(){
                return this.$store.getters.getProfile
            }
        },
        watch:{
            profile: function(){
                if(!this.profile){
                    this.initialize();

                }
            }
        },
        mounted () {
            this.loading=true;
            setTimeout(this.initialize , 1500);
               
        },

        methods: {
            paciente(pid){
                this.$router.push( { name: 'Paciente', params: { id:pid }} )
            },
            initialize () {
                this.loading=true;
                var query=''
                if(this.miEstablecimiento){
                    query=`query {
                            pacientes( sort: "apellido_paterno:asc", where: {
                                establecimiento: "${this.profile.establecimiento.id}"
                            }) {
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
                                num_crisis
                                ultima_crisis
                                observaciones
                                forma_debut_desc

                               
                            }
                            }
                        `
                }else{
                    query=`query {
                            pacientes( sort: "apellido_paterno:asc") {
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
                                    num_crisis
                                    ultima_crisis
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
                                }
                            }
                        `
                }
                strapi.request('post', '/graphql', {
                    data: {
                        query: query
                    }
                }).then(response=>{
                    this.items=response.data.pacientes;
                    this.loading=false;
                }).catch(error=>{
                    this.loading=false;
                })
            },
            editPaciente(vObj){
                this.selectedObj=vObj;
                this.frmAction="edit";
                this.showForm=true;
            },
            closeFormPaciente(){
                this.selectedObj={};
                this.showForm=false;
                this.initialize();
            }
            
        },components:{
            NuevoPacienteFrm
        }
    }
</script>