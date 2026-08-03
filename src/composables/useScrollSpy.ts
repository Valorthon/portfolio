import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy (sectionIds: string[], offset = 100) {
  const activeId = ref<string>(sectionIds[0] ?? '')

  const onScroll = () => {
    const scrollPosition = window.scrollY + offset

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i]
      if (!id) {
        continue
      }
      const element = document.querySelector(`#${id}`)
      if (element && element.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
        activeId.value = id
        return
      }
    }

    activeId.value = sectionIds[0] ?? ''
  }

  const scrollTo = (id: string) => {
    const element = document.querySelector(`#${id}`)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { activeId, scrollTo }
}
