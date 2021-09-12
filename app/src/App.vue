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
              <span>Temperatura: {{ temperatura }} ºC</span>
              <v-slider v-model="temperatura" min="-25" max="40"> </v-slider>
            </v-col>
            <v-col cols="12" md="4">
              <span>Umidade: {{ umidade }} %</span>
              <v-slider v-model="umidade"> </v-slider>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn color="primary" elevation="8" large @click="postDrone"
                >Adicionar Drone</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="drones"
          :items-per-page="15"
          class="elevation-1"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.droneId }}</td>
              <td>{{ row.item.rastreamento }}</td>
              <td>{{ row.item.latitude }}</td>
              <td>{{ row.item.longitude }}</td>
              <td>{{ row.item.temperatura }}</td>
              <td>{{ row.item.umidade }}</td>
              <td>
                <v-btn
                  class="mx-2"
                  dark
                  small
                  @click="onDelete(row.item.droneId)"
                >
                  Excluir
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    getDrone() {
      const rOpt = {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      };
      fetch(`${this.apiURL}/drone`, rOpt)
        .then((response) => response.json())
        .then((r) => {
          console.log(r);
          this.drones = r.map((drone) => {
            return {
              droneId: drone.droneId,
              rastreamento: drone.rastreamento ? "Ligado" : "Desligado",
              temperatura: `${drone.temperatura}ºC`,
              umidade: `${drone.umidade}%`,
              latitude: drone.latitude,
              longitude: drone.longitude,
              excluir: drone.droneId,
            };
          });
        })
        .catch((error) => console.log("error", error));
    },
    postDrone() {
      const raw = {
        droneId: this.id,
        latitude: this.latitude,
        longitude: this.longitude,
        temperatura: this.temperatura,
        umidade: this.umidade,
        rastreamento: this.rastreamento,
        excluir: this.id,
      };
      const rOpt = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(raw),
        headers: new Headers({
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      };
      fetch(`${this.apiURL}/drone`, rOpt)
        .then((response) => response.text())
        .then((r) => {
          alert(r);
          this.getDrone();
          this.id = null;
          this.latitude = null;
          this.longitude = null;
          this.temperatura = 15;
          this.umidade = 30;
          this.rastreamento = true;
          this.excluir = null;
        })
        .catch((error) => console.log("error", error));
    },
    onDelete(id) {
      const raw = {
        droneId: id
      }
      const rOpt = {
        method: "DELETE",
        redirect: "follow",
        body: JSON.stringify(raw),
        headers: new Headers({
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      };
      fetch(`${this.apiURL}/drone`, rOpt)
        .then((response) => response.text())
        .then((r) => {
          console.log(r);
          this.getDrone();
          this.id = null;
          this.latitude = null;
          this.longitude = null;
          this.temperatura = 15;
          this.umidade = 30;
          this.rastreamento = true;
          this.excluir = null;
        })
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.getDrone();
    // this.changePositionDrone();
  },
  data: () => ({
    apiURL: process.env.VUE_APP_API_URL,
    id: null,
    latitude: null,
    longitude: null,
    temperatura: 15,
    umidade: 30,
    rastreamento: true,
    excluir: null,
    drones: [],
    headers: [
      { text: "ID", value: "droneId" },
      { text: "Rastreamento", value: "rastreamento" },
      { text: "Latitude", value: "latitude" },
      { text: "Longitude", value: "longitude" },
      { text: "Temperatura (ºC)", value: "temperatura" },
      { text: "Umidade (%)", value: "umidade" },
      { text: "Excluir", value: "droneId" },
    ],
  }),
};
</script>
<style>
#map {
  height: 100%;
}
</style>