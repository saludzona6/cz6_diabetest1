<template>
        <v-timeline-item
            color="red"
            small
            >
            <v-layout pt-3>
                <v-flex xs3 pa-3>
                    <h3>Emergente</h3>
                    <strong>{{formato(registro.created_at)}}</strong>
                    <v-spacer></v-spacer>
                    <v-btn :to="'/registro/'+registro.id" outline small fab color="indigo">
                        <v-icon>remove_red_eye</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <div class="text-xs-center">
                        <v-chip outline color="pink" > <strong>Motivo: {{registro.eme_motivo}}</strong></v-chip>
                    </div> 
                    <div  >Peso: {{registro.reg_peso}} Kg.</div>
                    <div  >Talla: {{registro.reg_talla}} cm.</div>
                    <div  >IMC: {{registro.reg_imc}}</div>
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