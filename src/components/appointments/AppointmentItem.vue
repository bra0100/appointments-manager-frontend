<script>
    import { 
        cancelAppointment, 
        attendAppointment, 
        rescheduleAppointment,
    } 
    from '../../services/api.js';
    import { ref } from 'vue';
    import { APPOINTMENT_STATUS } from '../../constants';

    export default {
        props: {
            appointment: Object,
            serviceName: String
        },
        emits: ['refresh'],

        setup(props, { emit }) {
            const showModal = ref(false);
            const date = ref('');
            const time = ref('');
            const error = ref('');

            
            function openModal() {
                error.value = null;
                date.value = props.appointment.date;
                time.value = props.appointment.time;
                showModal.value = true;
            }

            function closeModal() {
                showModal.value = false;
            }

            function formatDate(date) {
                return new Date(date).toLocaleDateString(undefined, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
            }

            function formatTime(time) {
                const [hours, minutes] = time.split(':');
                const hour = parseInt(hours);
                const period = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                return `${displayHour}:${minutes} ${period}`;
            }

            async function cancel() {
                await cancelAppointment(props.appointment.id);
                emit('refresh');
            }
            async function attend() {
                await attendAppointment(props.appointment.id);
                emit('refresh');
            }

            async function reschedule() {
                try {
                    error.value = null;

                    await rescheduleAppointment(props.appointment.id, {
                        date: date.value,
                        time: time.value
                    });

                    showModal.value = false;
                    emit('refresh');
                } catch (err) {
                    error.value = err.message;
                }


            }

            return { 
                cancel, 
                attend, 
                formatDate,
                formatTime,
                reschedule, 
                showModal, 
                date, 
                time, 
                error, 
                openModal, 
                closeModal,
                APPOINTMENT_STATUS 
            };  
        }
    }
</script>

<template>
    <article
        class="appointment-card"
        :aria-labelledby="`appointment-${appointment.id}`"
    >

        <header class="appointment-header">
            <h3
                class="service-name"
                :id="`appointment-${appointment.id}`"
            >
                {{ serviceName }}
            </h3>

            <span
                class="status"
                :class="appointment.status"
                role="status"
                aria-live="polite"
            >
                {{ appointment.status }}
            </span>
        </header>

        <section class="appointment-datetime">
            <p>
                <time :datetime="appointment.date">
                    {{ formatDate(appointment.date) }}
                </time>
            </p>

            <p>
                <time>
                    {{ formatTime(appointment.time) }}
                </time>
            </p>
        </section>

        <footer class="appointment-actions">
            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-attend"
                @click="attend"
                aria-label="Mark appointment as attended"
            >
                Attend
            </button>

            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-reschedule"
                @click="openModal"
                aria-label="Reschedule appointment"
            >
                Reschedule
            </button>

            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-cancel"
                @click="cancel"
                aria-label="Cancel appointment"
            >
                Cancel
            </button>
        </footer>
    </article>

    <Transition name="modal">
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>Reschedule Appointment</h3>

                <p class="service-label">{{ serviceName }}</p>

                <div class="current-info">
                    <p><strong>Current date:</strong> {{ formatDate(appointment.date) }}</p>
                    <p><strong>Current time:</strong> {{ appointment.time }}</p>
                </div>

                <div class="datetime-group">
                    <label>
                        New date
                        <input type="date" v-model="date"/>
                    </label>

                    <label>
                        New time
                        <input type="time" v-model="time"/>
                    </label>
                </div>

                <p v-if="error" class="error">{{ error }}</p>

                <div class="modal-actions">
                    <button class="btn btn-primary" @click="reschedule">
                        Save changes
                    </button>
                    <button class="btn btn-secondary" @click="closeModal">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

