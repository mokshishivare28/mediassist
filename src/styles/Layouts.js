import styled from "styled-components";

export const MainLayout = styled.div` 
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    flex-direction: row;
    
    @media (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
        flex-direction: column;
    }
    
    @media (max-width: 480px) {
        padding: 0.5rem;
        gap: 0.5rem;
        flex-direction: column;
    }
`;

export const InnerLayout = styled.div`
    padding: 1rem 1.5rem;
    width: 100%;
    
    @media (max-width: 768px) {
        padding: 0.75rem 1rem;
    }
    
    @media (max-width: 480px) {
        padding: 0.5rem 0.75rem;
    }
`;