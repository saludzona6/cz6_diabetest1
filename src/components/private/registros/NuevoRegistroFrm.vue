<template>
  <v-layout>
    
      <v-dialog v-model="show" scrollable fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="cancel">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title v-if="obj && action=='edit'" >Editar {{title}}</v-toolbar-title>
            <v-toolbar-title v-if="!obj" >Nuevo {{title}}: {{paciente.apellido_paterno}} {{paciente.apellido_materno}}, {{paciente.nombres}} ({{paciente.identificacion}})</v-toolbar-title>
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
               <v-card v-if="!frmObj.id">
                   <v-card-title primary-title>
                       <div>
                           <h3 class="headline mb-0">Tipo de Registro:</h3>
                       </div>
                   </v-card-title>
                   <v-card-text>
                       <v-flex xs12 sm6 d-flex>
                            <v-select
                            v-model="frmObj.tipo"
                            :items="tipoItems"
                            label="Seleccione el tipo de registro"
                            outline
                            ></v-select>
                        </v-flex>
                   </v-card-text>        
               </v-card>      

              <v-card v-if="frmObj.tipo=='ENTREGA DE KIT'" >
               
                <v-card-text >
                  <h3>Datos de Entrega de Kit de Autocuidado</h3>
                </v-card-text>

                <v-menu
                    ref="kit_fecha"
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
                        v-model="frmObj.kit_fecha"
                        label="Fecha Entrega de Kit de Autocuidado"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.kit_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="kit_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.kit_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-text-field
                    label="Número de Tirillas Entregadas"
                    v-model="frmObj.kit_tirillas"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field>

                <v-text-field
                    label="Número de Controles diarios"
                    v-model="frmObj.kit_controles"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field>    

                <v-divider></v-divider>

                <v-select
                    v-model="frmObj.kit_entrega_glucagon"
                    :items="sinoItems"
                    label="Se realizó entrega de Glucagon?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.kit_entrega_glucagon =='SI'"
                    ref="kit_fecha_caducidad_glaucon"
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
                        v-model="frmObj.kit_fecha_caducidad_glaucon"
                        label="Fecha de Caducidad de GLUCAGON"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.kit_fecha_caducidad_glaucon" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="kit_fecha_caducidad_glaucon = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.kit_fecha_caducidad_glaucon.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.kit_calibracion_glaucometro"
                    :items="sinoItems"
                    label="Se realizó Calibración de Glucómetro?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.kit_calibracion_glaucometro =='SI'"
                    ref="kit_calibracion_glaucometro_fecha"
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
                        v-model="frmObj.kit_calibracion_glaucometro_fecha"
                        label="Fecha de Calibración de Glucómetro"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.kit_calibracion_glaucometro_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="kit_calibracion_glaucometro_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.kit_calibracion_glaucometro_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
               
              </v-card>
              
              <v-card v-if="frmObj.tipo=='REGISTRO SUBSECUENTE'" >
                
                <v-card-text >
                  <h3>Datos Principales</h3>
                </v-card-text>



                <v-divider></v-divider> 
                <v-card-text >
                  <h3>Datos Fondo de Ojo</h3>
                </v-card-text>

                <v-select
                    v-model="frmObj.reg_fondo_ojo"
                    :items="sinoItems"
                    label="Fondo de Ojo ?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_fondo_ojo =='SI'"
                    ref="reg_fondo_ojo_fecha"
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
                        v-model="frmObj.reg_fondo_ojo_fecha"
                        label="Fecha Fondo de Ojo"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_fondo_ojo_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_fondo_ojo_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_fondo_ojo_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-textarea
                    v-if="frmObj.reg_fondo_ojo =='SI'"
                    v-model="frmObj.reg_fondo_ojo_observaciones"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Observaciones Fondo de Ojo"
                    rows="2"
                    outline
                    prepend-icon="message"
                  ></v-textarea>

                <v-divider></v-divider>
                <v-card-text >
                  <h3>Controles Multidisciplinarios</h3>
                </v-card-text>
                <v-select
                    v-model="frmObj.reg_valoracion_psicologica"
                    :items="sinoItems"
                    label="Valoración Psicológica?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_valoracion_psicologica =='SI'"
                    ref="reg_valoracion_psicologica_fecha"
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
                        v-model="frmObj.reg_valoracion_psicologica_fecha"
                        label="Fecha Valoración Psicológica"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_valoracion_psicologica_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_valoracion_psicologica_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_valoracion_psicologica_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.reg_control_nutricional"
                    :items="sinoItems"
                    label="Control Nutricional?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_control_nutricional =='SI'"
                    ref="reg_control_nutricional_fecha"
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
                        v-model="frmObj.reg_control_nutricional_fecha"
                        label="Fecha Último Control Nutricional"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_control_nutricional_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_control_nutricional_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_control_nutricional_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.reg_control_medico"
                    :items="sinoItems"
                    label="Control Médico?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_control_medico =='SI'"
                    ref="reg_control_medico_fecha"
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
                        v-model="frmObj.reg_control_medico_fecha"
                        label="Fecha Último Control Médico"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_control_medico_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_control_medico_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_control_medico_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-text-field
                    v-if="frmObj.reg_control_medico =='SI'"
                    label="Especialidad"
                    v-model="frmObj.reg_control_medico_especialista"
                    required
                    :disabled="action=='delete' || loading"
                    type="text"
                    outline
                ></v-text-field>

                <v-select
                    v-model="frmObj.reg_control_podologia"
                    :items="sinoItems"
                    label="Ultimo Control Podología?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_control_podologia =='SI'"
                    ref="reg_control_podologia_fecha"
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
                        v-model="frmObj.reg_control_podologia_fecha"
                        label="Fecha Último Control Podología"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_control_podologia_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_control_podologia_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_control_podologia_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-divider></v-divider>    
                <v-card-text >
                  <h3>Talleres</h3>
                </v-card-text>

                <v-select
                    v-model="frmObj.reg_taller_educacion"
                    :items="sinoItems"
                    label="Taller de Educación?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_taller_educacion =='SI'"
                    ref="reg_taller_educacion_fecha"
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
                        v-model="frmObj.reg_taller_educacion_fecha"
                        label="Fecha Último Taller de Educación"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_taller_educacion_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_taller_educacion_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_taller_educacion_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.reg_taller_nutricion"
                    :items="sinoItems"
                    label="Taller de Nutrición?"
                    outline
                ></v-select>

                <v-menu
                    v-if="frmObj.reg_taller_nutricion =='SI'"
                    ref="reg_taller_nutricion_fecha"
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
                        v-model="frmObj.reg_taller_nutricion_fecha"
                        label="Fecha Último Taller Nutrición"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_taller_nutricion_fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_taller_nutricion_fecha = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_taller_nutricion_fecha.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.reg_club_diabetes"
                    :items="sinoItems"
                    label="Pertenece al Club de Diabetes?"
                    outline
                ></v-select>

                                <v-divider></v-divider>    
                <v-card-text >
                  <h3>Actividad Física</h3>
                </v-card-text>

                <v-select
                    v-model="frmObj.reg_actividad_fisica"
                    :items="sinoItems"
                    label="Realiza actividad física?"
                    outline
                ></v-select>

                <v-select v-if="frmObj.reg_actividad_fisica=='SI'"
                    v-model="frmObj.reg_actividad_fisica_tipo"
                    :items="tipoActividadItems"
                    label="Seleccione Tipo de Actividad Física"
                    outline
                ></v-select>

                <v-text-field v-if="frmObj.reg_actividad_fisica=='SI'"
                    label="Descripción de la actividad física"
                    v-model="frmObj.reg_actividad_fisica_descripcion"
                    required
                    :disabled="action=='delete' || loading"
                    outline
                    prepend-icon="pool"
                ></v-text-field> 

                <v-text-field v-if="frmObj.reg_actividad_fisica=='SI'"
                    label="Dureción de la Actividad Física (horas x semana)"
                    v-model="frmObj.reg_actividad_duracion"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="timer"
                ></v-text-field>

                <v-divider></v-divider> 
                <div class="blue lighten-4">
                <v-card-text >
                  <h3>ESQUEMA DE INSULINA</h3>
                </v-card-text>
                
                     
                <v-select
                    v-model="esquema_insulina"
                    :items="appData.tipoinsulinas"
                    label="Tipo de Esquema"
                    multiple
                    chips
                    hint="Seleccione el esquema"
                    persistent-hint
                    item-text="nombre"
                    outline
                    prepend-icon="invert_colors"
                    return-object
                    cache-items
                    clearable

                ></v-select>

                <template v-for="i in esquema_insulina">
                   <v-layout v-bind:keY="i.id" row wrap>
                        <v-flex d-flex xs12  mb-2 ml-5 mr-5 v-if="i.tipo_reemplazo=='BOLO'">
                            <v-card color="blue" dark>
                            <v-card-title primary class="title">{{i.nombre}} / {{i.tipo}} / {{i.tipo_reemplazo}}</v-card-title>
                            <v-card-text>
                                <v-layout row wrap>
                                        <v-flex xs12 sm4 md3 ma-2>
                                            <v-text-field
                                                label=""
                                                outline
                                                v-model="i.a1"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm4 md3 ma-2>
                                            <v-text-field
                                                label=""
                                                outline
                                                v-model="i.a2"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm4 md3 ma-2>
                                            <v-text-field
                                                label=""
                                                outline
                                                v-model="i.a3"
                                            ></v-text-field>
                                        </v-flex>

                                </v-layout>          

                            </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex xs12  mb-2 ml-5 mr-5 v-if="i.tipo_reemplazo=='BASAL'">
                            <v-card color="green" dark>
                            <v-card-title primary class="title">{{i.nombre}} / {{i.tipo}} / {{i.tipo_reemplazo}}</v-card-title>
                            <v-card-text>
                                <v-layout row wrap>
                                        <v-flex xs4 sm4 ma-2>
                                            <v-text-field
                                                v-model="i.am"
                                                label="AM"
                                                outline
                                                type="number"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs4 sm4 ma-2>
                                            <v-text-field
                                                v-model="i.pm"
                                                label="PM"
                                                outline
                                                type="number"
                                            ></v-text-field>
                                        </v-flex>
                                </v-layout>          

                            </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </template>
                
                </div>           

                <v-divider></v-divider>    
                <v-card-text >
                  <h3>Datos Adicionales</h3>
                </v-card-text>

                <v-text-field 
                    label="Número de Glucemias Capilares que realiza por día"
                    v-model="frmObj.reg_num_glaucemias_dia"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-select
                    v-model="frmObj.reg_lipodistrofia"
                    :items="sinoItems"
                    label="Presenta Lipodistrofia?"
                    outline
                ></v-select>

                <v-select
                    v-model="frmObj.reg_lipohipertrofia"
                    :items="sinoItems"
                    label="Presenta Lipohipertrofia?"
                    outline
                ></v-select>

                <v-text-field v-if="frmObj.reg_lipohipertrofia=='SI'"
                    label="Especificar Zona"
                    v-model="frmObj.reg_lipohipertrofia_zona"
                    required
                    :disabled="action=='delete' || loading"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="Presion Arterial"
                    v-model="frmObj.reg_presion_arterial"
                    required
                    :disabled="action=='delete' || loading"
                    type="text"
                    outline
                ></v-text-field> 
                
                <v-divider></v-divider> 
                <v-card-text >
                  <h3>Datos Antropométricos</h3>
                </v-card-text>

                <v-text-field 
                    label="Peso (KG)"
                    v-model="frmObj.reg_peso"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="Talla (CM)"
                    v-model="frmObj.reg_talla"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="IMC"
                    v-model="frmObj.reg_imc"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="Perímetro Abdominal"
                    v-model="frmObj.reg_perimetro_abdominal"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-divider></v-divider> 
                <v-card-text >
                  <h3>TANNER - FUM - Menarca</h3>
                </v-card-text>

                <v-select
                    v-model="frmObj.reg_tanner"
                    :items="sinoItems"
                    label="TANNER?"
                    outline
                ></v-select>

                <v-select v-if="frmObj.reg_tanner=='SI'"
                    v-model="frmObj.reg_tanner_escala"
                    label="Escala"
                    :items="escalaTanner"
                    outline
                ></v-select>

                <v-menu
                    
                    ref="reg_fum"
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
                        v-model="frmObj.reg_fum"
                        label="FUM"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_fum" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_fum = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_fum.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-text-field 
                    
                    label="Menarca"
                    v-model="frmObj.reg_menarca"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field> 

                <v-divider></v-divider> 
                <v-card-text >
                  <h3>Datos Perfil Analítico</h3>
                </v-card-text>

                <v-text-field
                    label="Valor de Hb1Ac (último control)"
                    v-model="frmObj.reg_valor_hb1ac"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field>  

                <v-menu
                    ref="reg_fecha_hb1ac"
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
                        v-model="frmObj.reg_fecha_hb1ac"
                        label="Fecha último control Hb1Ac"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_fecha_hb1ac" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_fecha_hb1ac = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_fecha_hb1ac.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>




                <v-menu
                    ref="reg_fecha_perfil_analitico"
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
                        v-model="frmObj.reg_fecha_perfil_analitico"
                        label="Fecha de último perfil analítico completo"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        outline
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="frmObj.reg_fecha_perfil_analitico" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="reg_fecha_perfil_analitico = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.reg_fecha_perfil_analitico.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>

                <v-select
                    v-model="frmObj.reg_perfilanaliticos"
                    :items="appData.perfilanaliticos"
                    label="Perfil Analítico"
                    multiple
                    chips
                    hint="Seleccione items de perfil analítico"
                    persistent-hint
                    item-text="nombre"
                    item-value="id"
                    outline
                    prepend-icon="invert_colors"
                ></v-select>

                <v-autocomplete
                    v-model="frmObj.reg_cie10s"
                    :items="appData.cie10S"
                    item-text="descripcion"
                    label="Complicaciones CIE10"
                    item-value="id"
                    multiple
                    chips
                    box
                    deletable-chips
                    outline
                    prepend-icon="receipt"
                ></v-autocomplete>

                <v-text-field 
                    label="Número de Hipoglucemias por Semana"
                    v-model="frmObj.reg_hipoglucemias_semana"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field> 

                <v-text-field 
                    label="Número de Hiperglicemias por Semana"
                    v-model="frmObj.reg_hiperglicemias_semana"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field> 

                <v-text-field 
                    label="Hiperglucemias Prandiales"
                    v-model="frmObj.reg_hiperglucemia_prandiales"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field>

                <v-text-field 
                    label="Hiperglucemias Postprandiales"
                    v-model="frmObj.reg_hiperglucemia_postprandiales"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field> 

                <!-- <v-text-field 
                    label="Número de Hipoglucemias Graves por Semana"
                    v-model="frmObj.reg_hipoglucemias_semana"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                    prepend-icon="image_aspect_ratio"
                ></v-text-field>  -->

                <v-divider></v-divider> 
                <v-card-text >
                  <h3>Observaciones</h3>
                </v-card-text>

                <v-select
                    v-model="frmObj.reg_controlado"
                    :items="sinoItems"
                    label="Paciente controlado?"
                    outline
                ></v-select>
                
                
                <v-textarea
                    v-model="frmObj.reg_observaciones"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Observaciones"
                    rows="2"
                    outline
                    prepend-icon="message"
                  ></v-textarea>

              </v-card>

              <v-card v-if="frmObj.tipo=='REGISTRO EMERGENTE'" >
                  
                  <v-card-text >
                      <h3>Registro Emergente</h3>
                  </v-card-text>
                
                  <v-text-field
                      label="Motivo de Consulta"
                      v-model="frmObj.eme_motivo"
                      type="text"
                      required
                      :disabled="action=='delete' || loading"
                      outline
                  ></v-text-field>
                
                <v-card-text >
                  <h3>Datos Antropométricos</h3>
                </v-card-text>

                <v-text-field 
                    label="Peso (KG)"
                    v-model="frmObj.reg_peso"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="Talla (CM)"
                    v-model="frmObj.reg_talla"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="IMC"
                    v-model="frmObj.reg_imc"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 

                <v-text-field 
                    label="Perímetro Abdominal"
                    v-model="frmObj.reg_perimetro_abdominal"
                    required
                    :disabled="action=='delete' || loading"
                    type="number"
                    outline
                ></v-text-field> 
                
                <v-divider></v-divider> 
                <v-card-text >
                  <h3>Observaciones</h3>
                </v-card-text>

                <v-textarea
                    v-model="frmObj.reg_observaciones"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Observaciones"
                    rows="2"
                    outline
                    prepend-icon="message"
                  ></v-textarea>
                
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

}

export default {
  name: 'NuevoRegistroFrm',
  props: {
    obj: {
      type: Object,
      default: function () { return JSON.parse(JSON.stringify(OBJ)); }
    },
    paciente: {
      type: Object
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
      title:"Registro",
      description:"El Registro",
      hasSaved: false,
      loading: false,
      error:null,
      frmObj: {},
      date:null,
      sinoItems:["SI","NO", "NO APLICA"],
      escalaTanner:["I","II","III","IV","V"],
      tipoItems:["ENTREGA DE KIT", "REGISTRO SUBSECUENTE", "REGISTRO EMERGENTE"],
      tipoActividadItems:["AERÓBICA","ANAERÓBICA"],
      esquema_insulina:[]
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
      }else{
        this.frmObj = JSON.parse(JSON.stringify(this.obj));
      }
    }
  },
  mounted(){
    if(!this.obj){
      this.frmObj=JSON.parse(JSON.stringify(OBJ));
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
    //   if (this.$v.$invalid) {
    //     return;
    //   }
      this.loading=true;
      this.error=null;
      if(this.obj){
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
        this.frmObj.paciente=this.paciente;
        
        console.log(this.frmObj);
        //return;
        strapi.createEntry('registros', this.frmObj ).then(response=>{
        //   this.hasSaved = true
        //   this.clear()
        //   this.$emit('frmClose')
            
            this.frmObj.esquemainsulinas=this.saveEsquemaInsulina(response);
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
    }, saveEsquemaInsulina(registro){
        let esquemasinsulinas=[]; 
        this.esquema_insulina.forEach(element => {
            //console.log(element);
            let tipoInsulina ={
                id: element.id
            }
            let esquema={
                tipoinsulina:element.id,
                registro:registro.id,
                am:element.am,
                pm:element.pm,
                a1:element.a1,
                a2:element.a2,
                a3:element.a3
            }
            esquemasinsulinas.push(esquema);
            //esquemasinsulinas.push(element.id)
             strapi.createEntry('esquemainsulinas', esquema ).then(response=>{
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
        });
        // console.log("ANTES 0")
        // console.log(esquemasinsulinas)
        // if(esquemasinsulinas.length >0){
        //     console.log("ANTES 1")
           
        // }
        this.hasSaved = true
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
    computedFechaDebutFormatted(){
      if(this.frmObj.fecha_debut)
        return new Date(this.frmObj.fecha_debut).toISOString().substr(0, 10)
      else
        return  new Date().toISOString().substr(0, 10)
    }

  }
}
</script>

<style scoped>

</style>
