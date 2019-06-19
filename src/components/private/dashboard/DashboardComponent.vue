<template>
  <v-container >
      <v-layout  justify-center mt-2 >
        <v-flex xs12 md12 ma-1 transition="scale-transition">
          <v-toolbar >
              User: {{profile.username}} | {{profile.nombres}} | {{profile.email}}
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn  to="/profile" color="blue-grey lighten-1" >Profile</v-btn>
              </v-toolbar-items>
          </v-toolbar>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" v-if="profile.establecimiento">Establecimiento: {{profile.establecimiento.nombre}}</h3>
              </div>
            </v-card-title>

            
          </v-card>

        </v-flex>
        
        
      </v-layout>
      <Pacientes></Pacientes>  




  </v-container>
</template>

<script>
import Pacientes from "@/components/private/Pacientes"
import axios from "axios"
export default {
  data(){
    return {
      loading:false
    }
  },
  computed:{
    profile(){
        return this.$store.getters.getProfile
      }
  },
  methods: {
    
  },components:{
    Pacientes
  }
}
</script>
