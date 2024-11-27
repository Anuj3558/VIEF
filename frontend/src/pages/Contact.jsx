import React, { useState } from 'react';
import { 
  motion 
} from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail
} from 'lucide-react';
import { 
  Form, 
  Input, 
  Select, 
  Radio, 
  Button, 
  message 
} from 'antd';
import axios from 'axios';
import { contact } from '../Assets/images';

const { TextArea } = Input;
const { Option } = Select;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    'Project',
    'Incubation',
    'Course',
    'Other',
    'Funding',
    'Incubation at VIEF',
    'R&D',
    'Booking (Meeting Room/suites/Guest Rooms)',
    'IPR Patent',
    'Technology Transfer',
    'Acceleration'
  ];

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Send data to backend
      const response = await axios.post('/api/contact/submit-contact', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Success notification
      message.success('Message sent successfully!');
      
      // Reset form
      form.resetFields();
    } catch (error) {
      // Error notification
      message.error(
        error.response?.data?.message || 
        'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${contact})`,
          }}
        >
          <div className="absolute inset-0 bg-gray-300 bg-opacity-50" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <h1 className="text-2xl md:text-5xl mt-20 text-left text-black font-semibold mt-32">
            Contact Us
          </h1>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-left text-[#011334] mb-4">Let's talk with us</h2>
              <p className="text-gray-600 text-left">
                Questions, comments, or suggestions?
                Simply fill in the form and we'll be in touch shortly.
              </p>
            </div>

            <div className="rounded-lg py-4 gap-12 space-y-12">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-left">Our Location</p>
                  <p className="text-sm text-gray-600">
                    1055 Arthur ave Elk Groot, 67,<br />
                    New Palmas South Carolina.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-left">Phone Number</p>
                  <p className="text-sm text-gray-600">+1 234 678 9108 99</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-left">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-left">Email Address</p>
                  <p className="text-sm text-gray-600">Contact@moralizer.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white shadow-md rounded-lg p-6">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { 
                      required: true, 
                      message: 'Please input your full name!' 
                    }
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="type"
                  label="Type"
                  initialValue="individual"
                >
                  <Radio.Group>
                    <Radio value="individual">Individual</Radio>
                    <Radio value="company">Company</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    { 
                      required: true, 
                      message: 'Please select a subject!' 
                    }
                  ]}
                >
                  <Select placeholder="Select a subject">
                    {subjects.map((subject, index) => (
                      <Option key={index} value={subject}>
                        {subject}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { 
                      required: true, 
                      message: 'Please input your email!' 
                    },
                    { 
                      type: 'email', 
                      message: 'Please enter a valid email!' 
                    }
                  ]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input placeholder="+1 (555) 000-0000" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Your Message"
                  rules={[
                    { 
                      required: true, 
                      message: 'Please input your message!' 
                    }
                  ]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Type your message here..." 
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    loading={isSubmitting}
                    className="bg-[#1A2587] hover:bg-blue-700"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;