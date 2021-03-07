<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Controle de Drones</h1>
      </div>
    </v-app-bar>
    <v-main>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="id"
                label="Drone ID"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="9">
              <v-switch v-model="rastreamento" label="Rastreamento"></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="latitude"
                label="Latitude"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="longitude"
                label="Longitude"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-slider v-model="temperatura" label="Temperatura"> </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <v-slider v-model="umidade" label="Umidade"> </v-slider>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn color="primary" elevation="8" large>Adicionar Drone</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="drones"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
        <google-map />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GoogleMap from "./components/GoogleMap";
export default {
  name: "App",

  components: {
    GoogleMap,
  },
  methods: {},
  data: () => ({
    id: null,
    latitude: null,
    longitude: null,
    temperatura: null,
    umidade: null,
    rastreamento: true,
    headers: [
      { text: "ID", align: "start", sortable: false, value: "id" },
      { text: "Rastreamento", value: "rastreamento" },
      { text: "Latitude", value: "lat" },
      { text: "Longitude", value: "long" },
      { text: "Temperatura (graus celsius)", value: "graus" },
      { text: "Umidade (%)", value: "umidade" },
    ],
    drones: [
      {
        id: "01",
        rastreamento: "Desligado",
        lat: 6412424.32,
        long: 312312.32,
        graus: 44.0,
        umidade: "3%",
      },
      {
        id: "02",
        rastreamento: "Ligado",
        lat: 6412424.32,
        long: 312312.32,
        graus: 44.0,
        umidade: "3%",
      },
    ],
  }),
};
</script>
<style>
#map {
  height: 100%;
}
</style>