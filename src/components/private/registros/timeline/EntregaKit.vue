<template>
        <v-timeline-item
            color="pink"
            small
            >
            <v-layout pt-3>
                <v-flex xs3 pa-3>
                    <h3>Entrega de Kit</h3>
                    <strong>{{formato(registro.created_at)}}</strong>
                    <v-spacer></v-spacer>
                    <v-btn :to="'/registro/'+registro.id" outline small fab color="indigo">
                        <v-icon>remove_red_eye</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <div class="text-xs-center">
                        <v-chip outline color="pink" > <strong>Tirillas Entregadas: {{registro.kit_tirillas}}</strong></v-chip>
                    </div> 
                    <div  >Calibración Glaucómetro: {{registro.kit_calibracion_glaucometro}}</div>
                    <div  >Entrega Glucogón: {{registro.kit_entrega_glucagon}}</div>
                    <div class="caption" v-if="registro.kit_entrega_glucagon=='SI'">Caducidad Glaucogón: {{formato(registro.kit_fecha_caducidad_glaucon)}}</div>
                </v-flex>
            </v-layout>
        </v-timeline-item>
</template>

<script>
    import moment from 'moment'
    export default {
        props: {
            registro: {
                type: Object
            }
        },

        data: () => ({
           
        }),

        computed: {
          
        },

        created () {
        
        },

        methods: {
            formato(fecha){
                return moment(String(fecha)).format('MMMM Do, YYYY')
            }
        }    
            
    }
</script>