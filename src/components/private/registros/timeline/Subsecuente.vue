<template>
    <v-timeline-item
        color="green"
        small
        >
        <v-layout pt-3>
            <v-flex xs3>
                <h3>Subsecuente</h3>
                <strong>{{formato(registro.created_at)}}</strong>
                <v-spacer></v-spacer>
                <v-btn :to="'/registro/'+registro.id" outline small fab color="indigo">
                    <v-icon>remove_red_eye</v-icon>
                </v-btn>
            </v-flex>
            <v-flex>
                <div class="text-xs-center">
                    <v-chip outline color="teal lighten-1" > <strong>HB1AC:{{registro.reg_valor_hb1ac}}</strong></v-chip>
                </div>    
                <div v-if="registro.reg_fondo_ojo=='SI'">Fondo Ojo: {{registro.reg_fondo_ojo}}</div>  
                <div>Hipoglucemias x Semana: {{registro.reg_hipoglucemias_semana}}</div>  
                <div>Glaucemias x Día: {{registro.reg_num_glaucemias_dia}}</div>  
                <div>Lipodistrofia: {{registro.reg_lipodistrofia}}</div>  
                <template v-if="registro.reg_cie10s.length>0">
                    <strong>CIE10: </strong>
                    <div class="text-xs-center">
                        <v-chip outline color="primary" v-bind:key="c.id" v-for="c in registro.reg_cie10s">{{c.codigo}}: {{c.descripcion}}</v-chip>
                    </div>  
                </template>
                <template v-if="registro.reg_perfilanaliticos.length>0">
                    <strong>Perfil Analítico: </strong>
                    <div class="text-xs-center">
                        <v-chip outline color="success" v-bind:key="c.id" v-for="c in registro.reg_perfilanaliticos"> {{c.nombre}}</v-chip>
                    </div>  
                </template>
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