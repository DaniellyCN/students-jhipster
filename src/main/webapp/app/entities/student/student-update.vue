<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="studentsApp.student.home.createOrEditLabel"
          data-cy="StudentCreateUpdateHeading"
          v-text="t$('studentsApp.student.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="student.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="student.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('studentsApp.student.firstName')" for="student-firstName"></label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="student-firstName"
              data-cy="firstName"
              :class="{ valid: !v$.firstName.$invalid, invalid: v$.firstName.$invalid }"
              v-model="v$.firstName.$model"
              required
            />
            <div v-if="v$.firstName.$anyDirty && v$.firstName.$invalid">
              <small class="form-text text-danger" v-for="error of v$.firstName.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('studentsApp.student.lastName')" for="student-lastName"></label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="student-lastName"
              data-cy="lastName"
              :class="{ valid: !v$.lastName.$invalid, invalid: v$.lastName.$invalid }"
              v-model="v$.lastName.$model"
              required
            />
            <div v-if="v$.lastName.$anyDirty && v$.lastName.$invalid">
              <small class="form-text text-danger" v-for="error of v$.lastName.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('studentsApp.student.email')" for="student-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="student-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
              required
            />
            <div v-if="v$.email.$anyDirty && v$.email.$invalid">
              <small class="form-text text-danger" v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('studentsApp.student.age')" for="student-age"></label>
            <input
              type="number"
              class="form-control"
              name="age"
              id="student-age"
              data-cy="age"
              :class="{ valid: !v$.age.$invalid, invalid: v$.age.$invalid }"
              v-model.number="v$.age.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./student-update.component.ts"></script>
