import { query } from './src/lib/db';
import crypto from 'crypto';

const getUUID = () => crypto.randomUUID();

async function seed() {
    const tenantId = 'demo-tenant';
    
    console.log('Seeding Lashing services...');
    
    const services = [
        {
            name: 'Pestañas Clásicas',
            description: 'Efecto natural, una extensión por cada pestaña natural.',
            duration: 60,
            price: 500,
            advance: 100,
            category: 'Extensiones'
        },
        {
            name: 'Volumen Ruso',
            description: 'Efecto glamuroso y tupido, abanicos hechos a mano.',
            duration: 120,
            price: 900,
            advance: 200,
            category: 'Extensiones'
        },
        {
            name: 'Pestañas Híbridas',
            description: 'Mezcla perfecta entre clásicas y volumen.',
            duration: 90,
            price: 700,
            advance: 150,
            category: 'Extensiones'
        },
        {
            name: 'Lifting de Pestañas',
            description: 'Levantamiento de pestaña natural con tinte incluido.',
            duration: 60,
            price: 450,
            advance: 100,
            category: 'Tratamientos'
        }
    ];

    for (const svc of services) {
        await query(
            'INSERT INTO services (id, tenant_id, name, description, duration_minutes, estimated_price, required_advance, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING',
            [getUUID(), tenantId, svc.name, svc.description, svc.duration, svc.price, svc.advance, svc.category]
        );
    }

    console.log('Seeding Staff...');
    const staff = [
        {
            name: 'Ana Lash',
            email: 'ana@lashing.com',
            role: 'Especialista Senior',
            specialty: 'Volumen Ruso',
            slug: 'ana'
        },
        {
            name: 'Lucia Reyes',
            email: 'lucia@lashing.com',
            role: 'Master Lashista',
            specialty: 'Híbridas y Diseño',
            slug: 'lucia'
        }
    ];

    for (const s of staff) {
        await query(
            'INSERT INTO staff (id, tenant_id, name, email, role, specialty, slug, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING',
            [getUUID(), tenantId, s.name, s.email, s.role, s.specialty, s.slug, true]
        );
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
