<template>
  <TieredMenu :model="items" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TieredMenu from 'primevue/tieredmenu';
import {useAuthStore} from '@/store/auth';

export default defineComponent({
  name: 'SidebarMain',
  components: { TieredMenu },
  data() {
    const authStore = useAuthStore()
    console.log(authStore.getEmail);
    console.log(authStore.isAuth)

    const loginObj = authStore.isAuth
        ? [
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-file',
            to: '/auth/logout'
          },
          {
            label: authStore.getEmail,
          },
        ]:[
          {
            label: 'Login',
            icon: 'pi pi-fw pi-file',
            to: '/auth/login'
          },
        ]

    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-file',
          to: '/'
        },
        {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Bookmark',
                  icon: 'pi pi-fw pi-bookmark'
                },
                {
                  label: 'Video',
                  icon: 'pi pi-fw pi-video'
                }
              ]
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-trash'
            },
            {
              separator: true
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link'
            }
          ]
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Left',
              icon: 'pi pi-fw pi-align-left'
            },
            {
              label: 'Right',
              icon: 'pi pi-fw pi-align-right'
            },
            {
              label: 'Center',
              icon: 'pi pi-fw pi-align-center'
            },
            {
              label: 'Justify',
              icon: 'pi pi-fw pi-align-justify'
            }
          ]
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-user-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-user-minus'
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: 'Filter',
                  icon: 'pi pi-fw pi-filter',
                  items: [
                    {
                      label: 'Print',
                      icon: 'pi pi-fw pi-print'
                    }
                  ]
                },
                {
                  icon: 'pi pi-fw pi-bars',
                  label: 'List'
                }
              ]
            }
          ]
        },
        {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus'
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus'
                }
              ]
            },
            {
              label: 'Archieve',
              icon: 'pi pi-fw pi-calendar-times',
              items: [
                {
                  label: 'Remove',
                  icon: 'pi pi-fw pi-calendar-minus'
                }
              ]
            }
          ]
        },
        {
          separator: true
        },
        ...loginObj
      ]
    };
  }
});
</script>

<style lang="scss">
.p-tieredmenu{
  position: fixed;
  z-index: 100;
  top: -2px;
  left: -2px;
  height: calc(100vh + 4px);
  border-radius: 0 10px 10px 0;
}
</style>
