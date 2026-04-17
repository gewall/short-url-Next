import { z } from "zod"

export const LinkSchema = z.object({
  id: z.uuidv4(),
  userId: z.uuidv4(),
  originalUrl: z.url(),
  shortCode: z.string().max(6),
  title: z.string().nonempty(),
  isActive: z.boolean(),
  expiresAt: z.date(),
  createdAt: z.date(),
})

export const CreateLinkSchema = LinkSchema.omit({
  id: true,
  userId: true,
  isActive: true,
  expiresAt: true,
  createdAt: true,
})

export const UpdateLinkSchema = LinkSchema.omit({
  userId: true,
  originalUrl: true,
  shortCode: true,
  createdAt: true,
  expiresAt: true,
})

export type CreateLink = z.infer<typeof CreateLinkSchema>

export type UpdateLink = z.infer<typeof UpdateLinkSchema>

export type Link = z.infer<typeof LinkSchema>

// ID          uuid.UUID `db:"id"`
// 	UserID      uuid.UUID `db:"user_id"`
// 	OriginalURL string    `db:"original_url"`
// 	ShortCode   string    `db:"short_code"`
// 	Title       string    `db:"title"`
// 	IsActive    bool      `db:"is_active"`
// 	ExpiresAt   time.Time `db:"expires_at"`
// 	CreatedAt   time.Time `db:"created_at"`
export const mockDataLinks: Link[] = [
  {
    id: "1",
    userId: "1",
    originalUrl: "https://example.com",
    shortCode: "abc123",
    title: "Example",
    isActive: true,
    expiresAt: new Date(), // Gunakan ISO string
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    originalUrl: "https://example.org",
    shortCode: "def456",
    title: "Example 2",
    isActive: true,
    expiresAt: new Date(),
    createdAt: new Date(),
  },
]
