
<script>
    import { ref, onUnmounted, computed, onMounted } from 'vue';
    import { getAppointments, getServices } from '../../services/api.js';
    import AppointmentItem from './AppointmentItem.vue';
    import { APPOINTMENT_STATUS } from '../../constants';

    export default {
        components: {
            AppointmentItem,
        },
        setup() {
            const appointments = ref([]);
            const services = ref([]);
            const statusFilter = ref('');
            const error = ref(null);
            let isMounted = true;

            async function loadAppointments() {
                error.value = null;
                try {
                    error.value = null;

                    const [appointmentsData, servicesData] = await Promise.all([
                        getAppointments(statusFilter.value),
                        getServices()
                    ]);

                    appointments.value = appointmentsData;
                    services.value = servicesData;

                } catch (err) {
                    error.value = 'Failed to load appointments.';
                }
            }

            onMounted(loadAppointments);

            const servicesMap = computed(() => {
                const map = {};
                for (const service of services.value) {
                    map[service.id] = service.name
                }
                return map;
            });

            return {
                appointments,
                statusFilter,
                servicesMap,
                error,
                loadAppointments,
                APPOINTMENT_STATUS,
            };
        },
    };
</script>

<template>
    <div>

        <select v-model="statusFilter" @change="loadAppointments">
            <option value="">All</option>
            <option :value="APPOINTMENT_STATUS.PENDING">Pending</option>
            <option :value="APPOINTMENT_STATUS.ATTENDED">Attended</option>
            <option :value="APPOINTMENT_STATUS.CANCELED">Canceled</option>
        </select>

        <ul>
            <AppointmentItem
                v-for="appointment in appointments"
                :key="appointment.id"
                :appointment="appointment"
                :serviceName="servicesMap[appointment.serviceId]"
                @refresh="loadAppointments"
            />
        </ul>

        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>
