# Dialog

Modal for confirmation and short forms. Every destructive action — delete chat, delete document, delete artifact, suspend user, run cleanup — uses the SAME pattern: danger icon well, title as a question naming the object, a description of the consequence, `ghost` Cancel + `danger` confirm whose label repeats the verb. On mobile it becomes a bottom sheet with stacked full-width buttons. The temporary-password dialog has no close X — it must be acknowledged.
