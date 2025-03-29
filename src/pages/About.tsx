
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="memorial-container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">About Stephen</h1>
            <p className="text-gray-600">
              July 15, 1958 - March 5, 2023
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <div className="sticky top-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Stephen Mureithi"
                    className="w-full"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium">Stephen Mureithi</h3>
                  <p className="text-gray-500">Beloved father, husband, and friend</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="prose prose-lg max-w-none">
                <p>
                  Stephen Mureithi was born on July 15, 1958, in a small village in Nyeri County, Kenya. The second of five children, he showed exceptional intelligence and determination from an early age. Despite the challenges of growing up in a rural area with limited resources, Stephen excelled in his studies, earning a scholarship to Alliance High School and later to the University of Nairobi.
                </p>
                
                <p>
                  After graduating with honors in Engineering, Stephen began a distinguished career at Kenya Power, where his technical expertise and leadership qualities quickly set him apart. Over his 35-year career, he rose to the position of Chief Engineer, overseeing numerous major infrastructure projects that brought electricity to previously unserved communities across the country.
                </p>
                
                <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Family Life</h2>
                <p>
                  In 1985, Stephen married Jane Wambui, beginning a loving partnership that would last for 38 years. Together they raised two children, Daniel and Sarah, instilling in them the values of education, hard work, and compassion that had guided Stephen's own life. His family was always his greatest pride and joy, and in recent years, he delighted in his new role as grandfather to young James.
                </p>
                
                <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Community Involvement</h2>
                <p>
                  Beyond his professional achievements, Stephen was deeply committed to his community. In 2005, he founded the Mureithi Education Foundation, which has provided scholarships to over 200 talented students from disadvantaged backgrounds. His belief in the transformative power of education led him to volunteer countless hours mentoring young engineers and speaking at schools throughout Kenya.
                </p>
                
                <p>
                  Stephen was also an active member of his church, serving as an elder and leading various outreach initiatives. His deep faith guided his actions and inspired those around him.
                </p>
                
                <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Legacy</h2>
                <p>
                  Stephen Mureithi passed away peacefully on March 5, 2023, surrounded by his loving family. He is survived by his wife Jane, his children Daniel and Sarah, his grandson James, and his siblings Joseph, Agnes, Peter, and Mary.
                </p>
                
                <p>
                  Stephen's legacy lives on not only in the infrastructure projects that transformed communities across Kenya but also in the countless lives he touched through his mentorship, generosity, and kindness. His unwavering integrity, gentle wisdom, and warm humor will be deeply missed by all who knew him.
                </p>
                
                <p>
                  In lieu of flowers, the family requests donations to the Mureithi Education Foundation to continue Stephen's mission of supporting education for deserving students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
