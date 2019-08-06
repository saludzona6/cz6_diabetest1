<template>
    <v-container >


    <v-tabs dark slider-color="yellow" >
            <v-tab key=1 ripple >
                Timeline
            </v-tab>
            
            <v-tab-item key="1">
                <v-card>

                    <v-card-text class="text-xs-center" >
                        <v-timeline align-top dense>
                            <template v-for="r in listRegistros">
                               <EntregaKit v-bind:key="r.id" v-bind:registro="r" v-if="r.tipo=='ENTREGA DE KIT'"></EntregaKit>  
                               <Subsecuente v-bind:key="r.id" v-bind:registro="r" v-if="r.tipo=='REGISTRO SUBSECUENTE'"></Subsecuente>  
                               <Emergente v-bind:key="r.id" v-bind:registro="r" v-if="r.tipo=='REGISTRO EMERGENTE'"></Emergente>  
                               <v-divider v-bind:key="'d'+r.id"></v-divider>
                            </template>    
                        </v-timeline>
                    </v-card-text>
                    
                </v-card>
            </v-tab-item> 
            <!-- <v-tab key=2 ripple >
                Tabla 
            </v-tab>
            <v-tab-item key="2" >
                <v-card>
                    <v-card-text class="text-xs-center" >
                           <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Buscar"
                                single-line

                            ></v-text-field>
                          
                    </v-card-text>
                    
                </v-card>
                
            </v-tab-item> -->
            <v-spacer></v-spacer>
              <v-btn icon  large @click="editRegistro(null)">
                <v-icon color="white" large>add_circle_outline</v-icon>
              </v-btn>
        </v-tabs>


  
    

    <NuevoRegistroFrm v-bind:show="showForm" v-bind:paciente="paciente" v-bind:obj="selectedObj" @frmClose="closeFormRegistro" v-bind:action="frmAction" ></NuevoRegistroFrm>
 </v-container>       
</template>

<script>
    
    import Strapi from 'strapi-sdk-javascript';
    import NuevoRegistroFrm from "@/components/private/registros/NuevoRegistroFrm"
    import EntregaKit from "@/components/private/registros/timeline/EntregaKit"
    import Subsecuente from "@/components/private/registros/timeline/Subsecuente"
    import Emergente from "@/components/private/registros/timeline/Emergente"
    import { setTimeout } from 'timers';
    const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'
    const strapi = new Strapi(apiUrl)
    export default {
        props: {
            paciente: {
                type: Object
            }
        },
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
                    value: 'apellido_paterno',
                    value: 'apellido_materno'
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
            },
            listRegistros() {
               return _.orderBy(this.paciente.registros, 'id', 'desc'); 
            }
        },
        watch:{
            
        },
        mounted () {
            this.loading=true;
            //setTimeout(this.initialize , 1000);
               
        },

        methods: {
            
            editRegistro(vObj){
                this.selectedObj=vObj;
                this.frmAction="edit";
                this.showForm=true;
            },
            closeFormRegistro(){
                this.selectedObj={};
                this.showForm=false;
                this.loadRegistros();
                
            },
            loadRegistros(){
                this.$emit('reload')
            }
            
        },components:{
            NuevoRegistroFrm,
            EntregaKit,
            Subsecuente,
            Emergente
        }
    }
</script>