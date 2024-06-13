<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="student">
        <h2 class="jh-entity-heading" data-cy="studentDetailsHeading">
          <span v-text="t$('studentsApp.student.detail.title')"></span> {{ student.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('studentsApp.student.firstName')"></span>
          </dt>
          <dd>
            <span>{{ student.firstName }}</span>
          </dd>
          <dt>
            <span v-text="t$('studentsApp.student.lastName')"></span>
          </dt>
          <dd>
            <span>{{ student.lastName }}</span>
          </dd>
          <dt>
            <span v-text="t$('studentsApp.student.email')"></span>
          </dt>
          <dd>
            <span>{{ student.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('studentsApp.student.age')"></span>
          </dt>
          <dd>
            <span>{{ student.age }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="student.id" :to="{ name: 'StudentEdit', params: { studentId: student.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./student-details.component.ts"></script>
