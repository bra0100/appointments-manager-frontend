<script>
import { ref, onMounted, computed } from 'vue';
import { getClients,
    getServices,
    createAppointment
} from '../../services/api.js';

export default {
    emits: ['created'],
    setup(_, {emit}) {
        const clients = ref([]);
        const services = ref([]);

        const clientId = ref('');
        const serviceId = ref('');
        const date = ref('');
        const time = ref('');

        const loading = ref(false);
        const error = ref(null);

        onMounted(async () => {
            try {
                const [clientsData, servicesData] = await Promise.all([
                    getClients(),
                    getServices()
                ]);

                clients.value = clientsData;
                services.value = servicesData;
            } catch (err) {
                error.value = 'Failed to load clients or services.';
            }
        });

        const isValid = computed(() => {
            return clientId.value && serviceId.value && date.value && time.vale
        })

        async function submit() {
            if (!isValid.value) {
                error.value = "All fields are required";
                return;
            }

            try {
                loading.value = true;
                error.value = null;

                await createAppointment({
                    clientId: clientId.value,
                    serviceId: serviceId.value,
                    date: date.value,
                    time: time.value
                });
                emit('created');

                clientId.value = '';
                serviceId.value = '';
                date.value = '';
                time.value = '';
            } catch (err) {
                error.value = 'Failed to create appointment.';
            } finally {
                loading.value = false;
            }
        }
        return {
            clients,
            services,
            clientId,
            serviceId,
            date,
            isValid,
            time,
            loading,
            error,
            submit
        }
        }
    }
</script>

<template>
    <form class="appointment-form" @submit.prevent="submit">
        <h3>Create Appointment</h3>
        <label>
            Client
            <select v-model="clientId">
                <option value="">Select a client</option>
                <option
                v-for="client in clients"
                :key="client.id"
                :value="client.id" 
                >
                    {{ client.name }} - {{ client.id }}
                </option>
            </select>
        </label>

        <label>
            Service
            <select v-model="serviceId">
                <option value="">Select a service</option>
                <option
                v-for="service in services"
                :key="service.id" 
                :value="service.id"
                >
                {{ service.name }}
                </option>
            </select>
        </label>

        <label>
            Date
            <input type="date" v-model="date" />
        </label>

        <label>
            Time
            <input type="time" v-model="time" />
        </label>

        <button type="btn btn-primary" :disabled="!isValid || loading">
            {{ loading ? 'Creating...' : 'Create Appointment' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>