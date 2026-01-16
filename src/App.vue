<script setup>
  import { ref, onMounted } from 'vue';
  import AppointmentList from './components/appointments/AppointmentList.vue';
  import AppointmentForm from './components/appointments/AppointmentForm.vue';
  
  const showForm = ref(false);
  const listRef = ref(null);

  function toggleForm() {
    showForm.value = !showForm.value;
  }

  function handleCreated() {
    showForm.value = false;
    listRef.value?.loadAppointments()
  }
</script>

<template>
  <div class="app">
    <h1>Appointment Manager</h1>

    <button @click="toggleForm">
      {{ showForm ? "Close Form" : "Create Appointment" }}
    </button>

    <AppointmentForm
    v-if="showForm"
    @created="handleCreated"
    />
  </div>

  <div>
    <h1>Appointments</h1>
    <AppointmentList ref="listRef" />
  </div>

</template>
