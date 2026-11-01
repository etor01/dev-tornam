// ─── Database types generated from schema ─────────────────────────────────────

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          content: string | null;
          cover_image: string | null;
          gallery: string[] | null;
          tech_stack: string[];
          category: string;
          github_url: string | null;
          live_url: string | null;
          year: number | null;
          status: string;
          featured: boolean;
          display_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          content?: string | null;
          cover_image?: string | null;
          gallery?: string[] | null;
          tech_stack?: string[];
          category?: string;
          github_url?: string | null;
          live_url?: string | null;
          year?: number | null;
          status?: string;
          featured?: boolean;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          content?: string | null;
          cover_image?: string | null;
          gallery?: string[] | null;
          tech_stack?: string[];
          category?: string;
          github_url?: string | null;
          live_url?: string | null;
          year?: number | null;
          status?: string;
          featured?: boolean;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      notes: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          category: string | null;
          tags: string[];
          published: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          category?: string | null;
          tags?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          category?: string | null;
          tags?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      lab_experiments: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          content: string | null;
          tools: string[];
          status: string;
          images: string[];
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          content?: string | null;
          tools?: string[];
          status?: string;
          images?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          content?: string | null;
          tools?: string[];
          status?: string;
          images?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ─── Convenience row types ─────────────────────────────────────────────────────

export type AdminRow = Database["public"]["Tables"]["admins"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type NoteRow = Database["public"]["Tables"]["notes"]["Row"];
export type LabExperimentRow = Database["public"]["Tables"]["lab_experiments"]["Row"];
export type SiteSettingRow = Database["public"]["Tables"]["site_settings"]["Row"];

export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type NoteInsert = Database["public"]["Tables"]["notes"]["Insert"];
export type NoteUpdate = Database["public"]["Tables"]["notes"]["Update"];

export type LabInsert = Database["public"]["Tables"]["lab_experiments"]["Insert"];
export type LabUpdate = Database["public"]["Tables"]["lab_experiments"]["Update"];
